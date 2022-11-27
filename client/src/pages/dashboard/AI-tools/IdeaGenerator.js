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
import { decode } from 'html-entities';
import { db } from '../../../firebase.config';
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import 'react-modal-video/scss/modal-video.scss';
import Model from './videoModal';
import '../AI-tools-css/ModalStyling.css';

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

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      displayAlert();
      return;
    }
    fetchApi(subject, gradeLevel);
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
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
        className="input-card"
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="form-center">
              <div className="titleAndVideo">
                <h4>Idea Generator 🧠</h4>
                <Model />
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
                {isLoading ? 'Please Wait...' : 'Generate Ideas'}
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
