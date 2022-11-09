import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';

const IdeaGenerator = () => {
  const { displayAlert, isLoading } = useAppContext();
  const [completion, setCompletion] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [text, setText] = useState('');

  async function fetchApi(subject, gradeLevel) {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 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',
      },
      body: JSON.stringify({
        model: 'text-davinci-002',
        prompt: `Give me 10 assessment, project, or classroom activity ideas for my ${gradeLevel} students.<br><br/>Topic: ${subject}<br><br/>Okay, here's your list:<br><br/>`,
        temperature: 0.8,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });
    const json = await response.json();
    setCompletion(json.choices[0].text);
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
              <h4>Assessment Generator 🧠</h4>
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

export default IdeaGenerator;
