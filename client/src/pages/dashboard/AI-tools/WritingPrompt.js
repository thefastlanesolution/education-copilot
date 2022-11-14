import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const WritingPrompt = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [text, setText] = useState('');

  async function fetchApi(subject, gradeLevel) {
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
      `${window.location.origin}/api/v1/completions/writingPromptCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('writingPromptCompletion ===', result);
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
    fetchApi(subject, gradeLevel);
  };
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
              <h4>Writing Prompt Generator 📝</h4>
              <FormRow
                type="text"
                labelText="Topic/Prompt:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Writing Prompt'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>Generate long form writing prompts with ease.</h5>
            <p>
              ✅ Currently, it's best to phrase your topic/prompt in the form of
              a question. Although, may still get great results using single
              words or statements.
              <br />✅ The goal of this tool is to create a long form writing
              prompt that promotes critical and analytical thinking.
              <br />
              <br />
              <h4>Examples 🥳</h4>
              <ol>- Do you believe zoos should exist?</ol>
              <ol>- Should schools have a dress code?</ol>
              <ol>- Are small schools more effective than large schools?</ol>
              <ol>- Should celebrating international holidays be mandatory?</ol>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="editor">
        <CKEditor
          editor={Editor}
          data={completion}
          onchange={(event, editor) => {
            const data = editor.setData('hello world');
            setText(data);
          }}
        ></CKEditor>
      </div>
    </Wrapper>
  );
};

export default WritingPrompt;
