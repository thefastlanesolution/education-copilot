import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const ParentEmails = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [firstFeedback, setFirstFeedback] = useState('');
  const [secondFeedback, setSecondFeedback] = useState('');
  const [thirdFeedback, setThirdFeedback] = useState('');
  const [fourthFeedback, setFourthFeedback] = useState('');
  const [text, setText] = useState('');

  async function fetchApi(
    firstFeedback,
    secondFeedback,
    thirdFeedback,
    fourthFeedback
  ) {
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
        console.log('parentEmailsCompletion ===', result);
        setCompletion(result.choices[0].text);
      })
      .catch(error => console.log('error', error));
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!firstFeedback) {
      displayAlert();
      return;
    }
    fetchApi(firstFeedback, secondFeedback, thirdFeedback, fourthFeedback);
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
              <h4>Parent-Teacher Email Composer 🎉</h4>
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

export default ParentEmails;
