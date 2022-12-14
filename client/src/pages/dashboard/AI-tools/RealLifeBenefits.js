import * as React from 'react';
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { db } from '../../../firebase.config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { Link } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';

const RealLifeBenefits = () => {
  const { displayAlert } = useAppContext();

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const debouncedTextChangeHandler = useCallback(
    debounce(handleEditorTextOnChange, 300),
    [completion]
  );

  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  async function fetchApi(subject) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/benefitsCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('benefitsCompletion ===', result);

        let textResult = decode(result.choices[0].text);
        textResult = nl2br(textResult);

        const dataToSave = {
          subject,
          application: 'Real World Benefits',
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

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      displayAlert();
      return;
    }
    fetchApi(subject);
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
    <React.Fragment>
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
                  <h4 className="pageTitle">Real World Benefits 🌎</h4>
                </div>
                <FormRow
                  type="text"
                  labelText="Subject or lesson plan to generate benefits for:"
                  name="subject"
                  placeholder="testing"
                  value={subject}
                  handleChange={e => setSubject(e.target.value)}
                />
                <button
                  className="btn btn-block"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Please Wait...' : 'Generate Benefits'}
                </button>
              </div>
            </form>
            <div className="bodyText">
              <h5>
                Generate a list that contains a few of the real world benefits
                to learning about any subject or topic.
              </h5>
              <p>
                ✅ Be as brief or detailed with the topics as you'd like. The
                more detailed, the better.
                <br />
                ✅ Great for writing on the whiteboard in the morning.
                <br />✅ The goal of this tool is to help finally answer the age
                old question, "Why are we learning this?"
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
    </React.Fragment>
  );
};

export default RealLifeBenefits;
