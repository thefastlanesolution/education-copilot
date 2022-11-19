import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { db } from '../../../firebase.config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

const RealLifeBenefits = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  async function saveCompletionToDB(collectionName, data) {
    const auth = getAuth();
    const user = auth.currentUser;
    data = {
      ...data,
      userId: user.uid,
      timestamp: Date.now(),
    };
    const ref = await addDoc(collection(db, collectionName), data);
  }

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
      `${window.location.origin}/api/v1/completions/benefitsCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('benefitsCompletion ===', result);
        setCompletion(result.choices[0].text);

        const dataToSave = {
          subject,
          application: 'Real World Benefits',
          generatedText: result.choices[0].text,
        };

        saveCompletionToDB('completions', dataToSave)
          .then(() => console.log('hi'))
          .catch(err => console.log('error', err));
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
              <h4>Real World Benefits 🌎</h4>
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
              Generate a list that contains a few of the real world benefits to
              learning about any subject or topic.
            </h5>
            <p>
              ✅ Be as brief or detailed with the topics as you'd like. The more
              detailed, the better.
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

export default RealLifeBenefits;
