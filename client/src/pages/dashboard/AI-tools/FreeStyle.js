import * as React from 'react';
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { decode } from 'html-entities';
import { db } from '../../../firebase.config';
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import '../AI-tools-css/FreeStyle.css';
import { getAuth } from '@firebase/auth';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { Link } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from 'react-spinners/RiseLoader';

const FreeStyle = () => {
  //Loading State

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

  const notify = () =>
    toast('🛸 Contacting the mother ship!', {
      position: 'top-right',
      autoClose: 30000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: 'light',
    });

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
      `${window.location.origin}/api/v1/completions/freeStyleCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('FreeStyleCompletion ===', result);

        let textResult = decode(result.choices[0].text);
        textResult = nl2br(textResult);

        const dataToSave = {
          subject,
          application: 'AI Freestyle',
          generatedText: textResult,
        };

        toast.dismiss();

        saveCompletionToDB('completions', dataToSave)
          .then(ref => {
            setCompletion({
              ...dataToSave,
              id: ref.id,
            });
            console.log('Saved succesfully, ref: ', ref);
          })
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      console.log('You must enter in a prompt');
      return;
    }
    notify();
    fetchApi(subject);
  };

  const handleChange = (event, editor) => {
    const valueOfCKEditor = document.querySelector(
      '.form-center .ck-content'
    ).innerText;
    console.log(valueOfCKEditor);
    return setSubject(valueOfCKEditor);
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

  function nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      '$1' + breakTag + '$2'
    );
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
                <h4 className="pageTitle">AI Freestyle 🚀</h4>
              </div>
              <CKEditor
                className="editorOne"
                onReadyJustInCase={editor => {
                  const editorDoc = editor.editing.view.document;
                  editorDoc.on('paste', (evt, data) => {
                    setTimeout(() => {
                      const pastedContent = data.domTarget.innerText;
                      setSubject(pastedContent);
                    }, 300);
                  });
                }}
                onReady={editor => {
                  editor.plugins
                    .get('ClipboardPipeline')
                    .on('inputTransformation', (event, data) => {
                      setTimeout(handleChange, 300);
                    });
                }}
                config={{
                  placeholder:
                    'Write a letter of introduction for the new teaching job I am applying to at Harvard University. Include reasons why I would be a great fit for the job!',
                }}
                editor={Editor}
                onChange={handleChange}
              ></CKEditor>
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RiseLoader color={'white'} loading={isLoading} size={7} />
                ) : (
                  'Generate Output'
                )}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>
              Ask for advice, order a document to be created, test the limits of
              Copilot!
            </h5>
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

export default FreeStyle;
