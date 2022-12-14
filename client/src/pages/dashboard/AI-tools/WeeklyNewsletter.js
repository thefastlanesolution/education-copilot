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

const WeeklyNewsletter = () => {
  const { displayAlert } = useAppContext();

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const debouncedTextChangeHandler = useCallback(
    debounce(handleEditorTextOnChange, 300),
    [completion]
  );
  const [firstTopic, setFirstTopic] = useState('');
  const [secondTopic, setSecondTopic] = useState('');
  const [thirdTopic, setThirdTopic] = useState('');
  const [fourthTopic, setFourthTopic] = useState('');
  const [fifthTopic, setFifthTopic] = useState('');
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

  async function fetchApi(
    firstTopic,
    secondTopic,
    thirdTopic,
    fourthTopic,
    fifthTopic,
    gradeLevel
  ) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      firstTopic,
      secondTopic,
      thirdTopic,
      fourthTopic,
      fifthTopic,
      gradeLevel,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/weeklyNewsletterCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('weeklyNewsletterCompletion ===', result);

        let textResult = decode(result.choices[0].text);
        textResult = nl2br(textResult);

        const dataToSave = {
          firstTopic,
          secondTopic,
          thirdTopic,
          fourthTopic,
          fifthTopic,
          gradeLevel,
          application: 'Weekly Newsletter',
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
          .catch(error => console.log('error', error));
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
    if (!firstTopic) {
      displayAlert();
      return;
    }
    fetchApi(
      firstTopic,
      secondTopic,
      thirdTopic,
      fourthTopic,
      fifthTopic,
      gradeLevel
    );
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
              <h4>Weekly Newsletter ????</h4>
              <FormRow
                type="text"
                labelText="Topic 1:"
                name="firstTopic"
                value={firstTopic}
                handleChange={e => setFirstTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 2:"
                name="secondTopic"
                value={secondTopic}
                handleChange={e => setSecondTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 3:"
                name="thirdTopic"
                value={thirdTopic}
                handleChange={e => setThirdTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 4:"
                name="fourthTopic"
                value={fourthTopic}
                handleChange={e => setFourthTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 5:"
                name="fifthTopic"
                value={fifthTopic}
                handleChange={e => setFifthTopic(e.target.value)}
              />
              {/* <FormRow
                type="text"
                labelText="Reminders, notes, other details:"
                name="reminders"
                value={reminders}
                handleChange={e => setReminders(e.target.value)}
              /> */}
              <FormRow
                type="text"
                labelText="Grade Level (And subject if applicable):"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Newsletter'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>Generate a weekly newsletter to send out or print.</h5>
            <p>
              ??? Be as brief or specific with the topics as you'd like.
              <br />
              ??? A great newsletter will cover multiple different topics,
              activities, and areas of discussion.
              <br />??? The goal of this newsletter is to inform both students
              and parents what will be covered throughout the following week!
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

export default WeeklyNewsletter;
