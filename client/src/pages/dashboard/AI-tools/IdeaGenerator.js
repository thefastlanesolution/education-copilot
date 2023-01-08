import * as React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { decode } from 'html-entities';

// CSS Imports
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { Link } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from 'react-spinners/RiseLoader';

// Firebase Imports
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
  setDoc,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../../firebase.config';
import AuthService from '../../../services/Auth.service';

const IdeaGenerator = () => {
  const { displayAlert } = useAppContext();
  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const debouncedTextChangeHandler = useCallback(
    debounce(handleEditorTextOnChange, 300),
    [completion]
  );
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const notify = () =>
    toast('💡 Generating Ideas!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  async function saveCompletionToDB(collectionName, data) {
    const auth = getAuth();
    const user = auth.currentUser;
    data = {
      ...data,
      userId: user.uid,
      timestamp: Date.now(),
    };
    const ref = await addDoc(collection(db, collectionName), data);
    return ref;
  }

  async function fetchApi(subject, gradeLevel) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    notify();

    const raw = JSON.stringify({
      subject,
      gradeLevel,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/shotgunCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('shotgunCompletion ===', result);
        let textResult = decode(result.choices[0].text);
        textResult = nl2br(textResult);

        const dataToSave = {
          subject,
          gradeLevel,
          application: 'Idea Generator',
          generatedText: textResult,
        };

        saveCompletionToDB('completions', dataToSave)
          .then(ref => {
            setCompletion({
              ...dataToSave,
              id: ref.id,
            });
            console.log('Saved succesfully, ref: ', ref);
          })
          .catch(err => console.log('error', err));
      })
      .catch(error => console.log('error', error));
  }

  function nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      '$1' + breakTag + '$2'
    );
  }

  // Fetch Documents Created, Check Subscription Status, and Fetch API
  const fetchDocumentsCreated = async () => {
    const auth = getAuth();

    // Get the user's document from the database
    const docRef = doc(db, 'users', auth.currentUser.uid);
    console.log('docRef', docRef);

    // Get the data from the user's document, store it in a variable
    const docSnap = await getDoc(docRef);
    console.log('docSnap', docSnap);
    const data = docSnap.data();
    console.log('data', data);

    // Get the total number of documents created by the user
    const currentCount = data.documentsCreated;

    // If the user has created more than 5 or more documents, redirect them to the pricing page. Otherwise, fetch the API and update the user's document with the new count.

    const hasUserActiveSubscription =
      await AuthService.doesUserHaveActiveSubscription();
    if (!hasUserActiveSubscription && currentCount && currentCount > 4) {
      // Redirect the user to the pricing page
      navigate('/pricing');
    } else {
      // Run the OpenAI Fetch API
      fetchApi(subject, gradeLevel);

      // Update the user's document with the new count
      await updateDoc(docRef, {
        documentsCreated: currentCount ? currentCount + 1 : 1,
      });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      displayAlert();
      return;
    }
    fetchDocumentsCreated();
  };

  async function handleEditorTextOnChange(event, editor) {
    if (!completion.id) return console.log('No completion selected');

    const data = editor.getData();
    console.log('Saving data ...');
    const docRef = doc(db, 'completions', completion.id);
    await updateDoc(docRef, {
      generatedText: data,
    });
  }

  return (
    <Wrapper>
      <Card
        sx={{
          backgroundColor: '#f8fafc',
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '0px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.25)',
          },
          boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.15)',
        }}
        className="input-card"
      >
        <CardContent>
          <div className="historylink">
            <Link to={'../workshop'}>
              {<ImArrowLeft2 className="historyicon" />}Workshop
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-center">
              <div className="titleAndVideo">
                <h4 className="pageTitle">Idea Generator 🧠</h4>
              </div>
              <FormRow
                type="text"
                labelText="Topic to generate ideas for:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Grade Level (And subject, if applicable):"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RiseLoader color={'white'} loading={isLoading} size={7} />
                ) : (
                  'Generate Ideas'
                )}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>Shotgun Style Assessment Ideas</h5>
            <p>
              ✅ Quickly generate quirky, out of the box ideas to assess any
              unit or individual lesson.
              <br />✅ The goal of this tool is to help you save time when it
              comes to brainstorming ideas related to engaging students.
              <br />✅ This tool is used best in combination with the others to
              help you quickly breeze through your lesson and unit planning.
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="editor">
        <CKEditor
          editor={Editor}
          data={completion.generatedText}
          onChange={debouncedTextChangeHandler}
        ></CKEditor>
      </div>
    </Wrapper>
  );
};

export default IdeaGenerator;
