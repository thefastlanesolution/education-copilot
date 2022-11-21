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
import Model from './videoModal';
import '../AI-tools-css/ModalStyling.css';

const ParentEmails = () => {
  const { displayAlert } = useAppContext();

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [firstFeedback, setFirstFeedback] = useState('');
  const [secondFeedback, setSecondFeedback] = useState('');
  const [thirdFeedback, setThirdFeedback] = useState('');
  const [fourthFeedback, setFourthFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedTextChangeHandler = useCallback(
    debounce(handleEditorTextOnChange, 300),
    [completion]
  );

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

  async function fetchApi(
    firstFeedback,
    secondFeedback,
    thirdFeedback,
    fourthFeedback
  ) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      firstFeedback,
      secondFeedback,
      thirdFeedback,
      fourthFeedback,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/parentEmailsCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('parentEmailsCompletion ===', result);

        let textResult = decode(result.choices[0].text);
        textResult = nl2br(textResult);

        const dataToSave = {
          firstFeedback,
          secondFeedback,
          thirdFeedback,
          fourthFeedback,
          application: 'Parent Emails',
          generatedText: result.choices[0].text,
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
    if (!firstFeedback) {
      displayAlert();
      return;
    }
    fetchApi(firstFeedback, secondFeedback, thirdFeedback, fourthFeedback);
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
                <h4>Parent Emails 🎉</h4>
                <Model />
              </div>
              <FormRow
                type="text"
                labelText="First feedback to address:"
                name="firstFeedback"
                value={firstFeedback}
                handleChange={e => setFirstFeedback(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Second feedback to address:"
                name="secondFeedback"
                value={secondFeedback}
                handleChange={e => setSecondFeedback(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Third feedback to address:"
                name="thirdFeedback"
                value={thirdFeedback}
                handleChange={e => setThirdFeedback(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Fourth feedback to address:"
                name="fourthFeedback"
                value={fourthFeedback}
                handleChange={e => setFourthFeedback(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Email'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>Generate an email to send out to a student's parent.</h5>
            <p>
              ✅ The more detailed the better.
              <br />
              ✅ Can easily detect between positive and negative feedback. Feel
              free to include both, or just one.
              <br />
              ✅ Simply click 'Generate Email' again if you don't like the first
              one!
              <br />✅ Simply click 'Generate Email' again if you don't like the
              first one!
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

export default ParentEmails;
