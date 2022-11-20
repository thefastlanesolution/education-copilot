import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './FreeStyle.css';

const FreeStyle = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [subject, setSubject] = useState('');

  async function fetchApi(subject) {
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
        console.log('FreeStyleCompletion ===', result);
        setCompletion(result.choices[0].text);
      })
      .catch(error => console.log('error', error));
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      displayAlert();
      return;
    }
    fetchApi(subject);
  };

  const handleChange = (event, editor) => {
    if (!event) return;
    const valueOfCKEditor = editor.getData();
    return setSubject(valueOfCKEditor);
  };

  // // useEffect(() => {
  // const div = document.querySelector(
  //   '#root > section > main > div > div > main > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.input-card.css-1gnog30-MuiPaper-root-MuiCard-root > div > form > div > div.ck.ck-reset.ck-editor.ck-rounded-corners > div.ck.ck-editor__main > div'
  // );
  // setSubject(div.innerText);
  // // }, []);

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
              <h4>AI Freestyle 🚀</h4>
              <CKEditor
                className="editorOne"
                editor={Editor}
                data="Prompt goes here..."
                onChange={handleChange}
              ></CKEditor>
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                Generate Output
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
          data={nl2br(completion)}
          onchange={console.log('Editor has changed!')}
        ></CKEditor>
      </div>
    </Wrapper>
  );
};

export default FreeStyle;
