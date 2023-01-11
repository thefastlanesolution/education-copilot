import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decode } from 'html-entities';

// CSS & Design Component Imports
import './AssessmentBuilder.css';
import FormRow from '../../../components/FormRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssessmentBuilderQuiz from './AssessmentBuilderQuiz';

// CSS and Icon imports
import { IoBulbSharp } from 'react-icons/io5';
import RingLoader from 'react-spinners/RingLoader';
import RiseLoader from 'react-spinners/RiseLoader';

// Firebase Imports
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../firebase.config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

const AssessmentBuilder = () => {
  // Question Type State
  const [checkBox1, setCheckbox1] = useState(true);
  const [checkBox2, setCheckbox2] = useState(false);
  const [checkBox3, setCheckbox3] = useState(false);
  const [checkBox4, setCheckbox4] = useState(false);

  // Question & Answers Array States
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [keys, setKeys] = useState([]);

  // Individual Question & Answer States
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newKey, setNewKey] = useState('');

  // User Inputs
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [quizCovers, setQuizCovers] = useState('');

  // Quiz Template States
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [answer5, setAnswer5] = useState('');
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [key3, setKey3] = useState('');
  const [key4, setKey4] = useState('');
  const [key5, setKey5] = useState('');

  // Miscelaneous States
  const [isLoading, setIsLoading] = useState(false);
  const [standardsHaveChanged, setStandardsHaveChanged] = useState(false);
  const [documentHasChanged, setDocumentHasChanged] = useState(false);
  const [completion, setCompletion] = useState({
    generatedText: '',
  });

  const notify = (msg, autoClose, id) =>
    toast(msg, {
      position: 'top-left',
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: 'light',
      toastId: id,
    });

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

  // API Request Function to get the generated text and set the states for the lesson plan sections

  async function fetchApi(subject, gradeLevel, quizCovers) {
    setIsLoading(true);
    notify('📝 Generating quiz template!', 22000, 'quizTemplate');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
      gradeLevel,
      quizCovers,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/quizGeneratorCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('quizGeneratorCompletion ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        // <question1>
        var regex = /<question1>(.*?)<\/question1>/s;
        var matchQuestion1 = textResult.match(regex);
        console.log('Question 1 Match ====', matchQuestion1[1]);
        setQuestion1(matchQuestion1[1]);

        // <question2>
        var regex = /<question2>(.*?)<\/question2>/s;
        var matchQuestion2 = textResult.match(regex);
        console.log('Question 2 Match ====', matchQuestion2[1]);
        setQuestion2(matchQuestion2[1]);

        // <question3>
        var regex = /<question3>(.*?)<\/question3>/s;
        var matchQuestion3 = textResult.match(regex);
        console.log('Question 3 Match ====', matchQuestion3[1]);
        setQuestion3(matchQuestion3[1]);

        // <question4>
        var regex = /<question4>(.*?)<\/question4>/s;
        var matchQuestion4 = textResult.match(regex);
        console.log('Question 4 Match ====', matchQuestion4[1]);
        setQuestion4(matchQuestion4[1]);

        // <question5>
        var regex = /<question5>(.*?)<\/question5>/s;
        var matchQuestion5 = textResult.match(regex);
        console.log('Question 5 Match ====', matchQuestion5[1]);
        setQuestion5(matchQuestion5[1]);

        // <answer1>
        var regex = /<answer1>(.*?)<\/answer1>/s;
        var matchAnswer1 = textResult.match(regex);
        console.log('Answer 1 Match ====', matchAnswer1[1]);
        setAnswer1(matchAnswer1[1]);

        // <answer2>
        var regex = /<answer2>(.*?)<\/answer2>/s;
        var matchAnswer2 = textResult.match(regex);
        console.log('Answer 2 Match ====', matchAnswer2[1]);
        setAnswer2(matchAnswer2[1]);

        // <answer3>
        var regex = /<answer3>(.*?)<\/answer3>/s;
        var matchAnswer3 = textResult.match(regex);
        console.log('Answer 3 Match ====', matchAnswer3[1]);
        setAnswer3(matchAnswer3[1]);

        // <answer4>
        var regex = /<answer4>(.*?)<\/answer4>/s;
        var matchAnswer4 = textResult.match(regex);
        console.log('Answer 4 Match ====', matchAnswer4[1]);
        setAnswer4(matchAnswer4[1]);

        // <answer5>
        var regex = /<answer5>(.*?)<\/answer5>/s;
        var matchAnswer5 = textResult.match(regex);
        console.log('Answer 5 Match ====', matchAnswer5[1]);
        setAnswer5(matchAnswer5[1]);

        // <key1>
        var regex = /<key1>(.*?)<\/key1>/s;
        var matchKey1 = textResult.match(regex);
        console.log('Key 1 Match ====', matchKey1[1]);
        setKey1(matchKey1[1]);

        // <key2>
        var regex = /<key2>(.*?)<\/key2>/s;
        var matchKey2 = textResult.match(regex);
        console.log('Key 2 Match ====', matchKey2[1]);
        setKey2(matchKey2[1]);

        // <key3>
        var regex = /<key3>(.*?)<\/key3>/s;
        var matchKey3 = textResult.match(regex);
        console.log('Key 3 Match ====', matchKey3[1]);
        setKey3(matchKey3[1]);

        // <key4>
        var regex = /<key4>(.*?)<\/key4>/s;
        var matchKey4 = textResult.match(regex);
        console.log('Key 4 Match ====', matchKey4[1]);
        setKey4(matchKey4[1]);

        // <key5>
        var regex = /<key5>(.*?)<\/key5>/s;
        var matchKey5 = textResult.match(regex);
        console.log('Key 5 Match ====', matchKey5[1]);
        setKey5(matchKey5[1]);

        setDocumentHasChanged(true);

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setDocumentHasChanged(false);
        }, 100);

        console.log('documentHasChanged ===', documentHasChanged);

        const dataToSave = {
          subject,
          gradeLevel,
          quizCovers,
          application: 'Quiz Generator',
          generatedText: result.choices[0].text,
        };

        // Save the completion to the database, then set the completion state, then log the ref, then catch any errors
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

  const submitQuiz = () => {
    if (subject && gradeLevel && quizCovers) {
      fetchApi(subject, gradeLevel, quizCovers);
    } else {
      alert('Please fill out all fields');
    }
  };

  async function fetchUnitStandards(subject, gradeLevel) {
    setIsLoading(true);
    notify('🛸 Contacting the mothership...', 6500, 'quizCovers');
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
      `${window.location.origin}/api/v1/completions/quizCoversCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('quizCoversCompletion ===', result);
        let textResult = result.choices[0].text;

        setStandardsHaveChanged(true);

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setStandardsHaveChanged(false);
        }, 100);

        setQuizCovers(textResult);
        toast.dismiss('quizCovers');
      })
      .catch(error => console.log('error', error));
  }

  const handleStandardGeneration = event => {
    event.preventDefault();
    if (!subject || !gradeLevel) {
      return;
    }
    fetchUnitStandards(subject, gradeLevel);
  };

  async function fetchNewQuestion(
    subject,
    gradeLevel,
    quizCovers,
    questions,
    answers
  ) {
    setIsLoading(true);
    notify('🔮 Generating new question!', 5000, 'newQuestion');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
      gradeLevel,
      quizCovers,
      questions,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/quizQuestionCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('quizQuestionCompletion ===', result);

        let textResult = decode(result.choices[0].text);
        console.log(textResult);

        // <question>
        var regex = /<question>(.*?)<\/question>/s;
        var matchquestion = textResult.match(regex);
        console.log(matchquestion[1]);
        let matchQuestion1 = matchquestion[1];
        setNewQuestion(matchQuestion1);

        // <answer>
        var regex = /<answer>(.*?)<\/answer>/s;
        var matchAnswer = textResult.match(regex);
        console.log(matchAnswer[1]);
        let matchAnswer1 = matchAnswer[1];
        setNewAnswer(matchAnswer1);

        // <key>
        var regex = /<key>(.*?)<\/key>/s;
        var matchKey = textResult.match(regex);
        console.log('Key Match ====', matchKey[1]);
        setNewKey(matchKey[1]);
      })
      .catch(error => console.log('error', error));
  }

  const handleNewQuestion = event => {
    console.log('new question clicked');
    fetchNewQuestion(subject, gradeLevel, quizCovers, questions, answers);
  };

  useEffect(() => {
    if (newAnswer != '') {
      const newQuestions = [...questions];
      const newAnswers = [...answers];
      const newKeys = [...keys];
      newQuestions.push(newQuestion);
      console.log('newQuestions === ', newQuestions);
      newAnswers.push(newAnswer);
      console.log('newAnswers === ', newAnswers);
      newKeys.push(newKey);
      setQuestions(newQuestions);
      setAnswers(newAnswers);
      setKeys(newKeys);
      setNewQuestion('');
      setNewAnswer('');
      setNewKey('');
      toast.dismiss('newQuestion');
    }
  }, [newKey]);

  useEffect(() => {
    if (documentHasChanged) {
      const questions = [question1, question2, question3, question4, question5];
      const answers = [answer1, answer2, answer3, answer4, answer5];
      const keys = [key1, key2, key3, key4, key5];
      setQuestions(questions);
      setAnswers(answers);
      setKeys(keys);
      setQuestion1('');
      setQuestion2('');
      setQuestion3('');
      setQuestion4('');
      setQuestion5('');
      setAnswer1('');
      setAnswer2('');
      setAnswer3('');
      setAnswer4('');
      setAnswer5('');
      setKey1('');
      setKey2('');
      setKey3('');
      setKey4('');
      setKey5('');
      toast.dismiss('quizTemplate');
    }
  }, [documentHasChanged]);

  const deleteQuestionAnswers = index => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);

    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);

    const newKeys = [...keys];
    newKeys.splice(index, 1);
    setKeys(newKeys);
  };

  return (
    <div className="assessment-container" id="page-one">
      <div className="right-container">
        <div className="questions-column">
          <div
            className="quiz-container"
            style={{
              background: '#7d5ff5',
              fontFamily: 'inter',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              padding: '1rem',
              margin: '2rem 2rem 0rem 2rem',
            }}
          >
            Questions & Answers
          </div>
          <div>
            {questions.map((question, index) => (
              <div key={index} className="quiz-container">
                <div className="quiz-content">
                  <div>
                    <div className="question-number">
                      <strong>Question {index + 1}</strong>
                    </div>
                  </div>
                  <div>{question}</div>
                  <div
                    className="lessontext-container"
                    style={{ padding: '1rem' }}
                    dangerouslySetInnerHTML={{
                      __html: answers[index].replace(
                        /\n/g,
                        '<p style="margin-top: 0.3em; margin-bottom: 0.3em;">'
                      ),
                    }}
                  ></div>
                  <div className="answer-key">
                    <div>
                      <strong>Answer {keys[index]}</strong>
                    </div>
                  </div>
                </div>
                <div className="card-quiz-controls">
                  {/* <button
                    className="btn btn-success"
                    onClick={() => handleNewQuestion(index)}
                  >
                    New Question
                  </button> */}
                  <button
                    className="btn btn-danger delete-button"
                    onClick={() => deleteQuestionAnswers(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="new-question-icon">
            <button
              disabled={
                subject === '' || gradeLevel === '' || quizCovers === ''
              }
              className="btn btn-block"
              style={{ width: '200px', marginTop: '3rem' }}
              onClick={handleNewQuestion}
            >
              {isLoading ? (
                <RiseLoader color={'white'} loading={isLoading} size={7} />
              ) : (
                '+ New Question'
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="left-container">
        <div
          className="quiz-form-header"
          style={{
            fontFamily: 'inter',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '1rem',
          }}
        >
          Quiz Builder
        </div>
        <form className="quiz-form">
          <div className="checkbox-group quiz-checkbox-group">
            <div className="check1">
              <input
                type="checkbox"
                name="lessonplancheckbox"
                id="lessonplancheckbox"
                value={checkBox1}
                onChange={e => setCheckbox1(e.target.checked)}
                checked={checkBox1}
              />
              <label htmlFor="checkbox1">Multiple Choice</label>
            </div>
            <div className="check2">
              <input
                type="checkbox"
                name="powerpointcheckbox"
                id="powerpointcheckbox"
                disabled={true}
                value={checkBox2}
                onChange={e => setCheckbox2(e.target.checked)}
              />
              <label htmlFor="checkbox2">
                Fill in the Blank &nbsp;
                <span style={{ fontStyle: 'italic', fontSize: '12px' }}>
                  (Coming soon...)
                </span>
              </label>
            </div>
            <div className="check3">
              <input
                type="checkbox"
                name="contextbuildercheckbox"
                id="contextbuildercheckbox"
                disabled={true}
                value={checkBox3}
                onChange={e => setCheckbox3(e.target.checked)}
              />
              <label htmlFor="checkbox3">
                True or False &nbsp;
                <span style={{ fontStyle: 'italic', fontSize: '12px' }}>
                  (Coming soon...)
                </span>
              </label>
            </div>
            <div className="check4">
              <input
                type="checkbox"
                name="educationalcheckbox"
                disabled={true}
                id="educationalcheckbox"
                value={checkBox4}
                onChange={e => setCheckbox4(e.target.checked)}
              />
              <label htmlFor="checkbox4">
                Written Response &nbsp;
                <span style={{ fontStyle: 'italic', fontSize: '12px' }}>
                  (Coming soon...)
                </span>
              </label>
            </div>
          </div>

          <FormRow
            type="text"
            labelText="Topic + Keywords:"
            name="subject"
            value={subject}
            handleChange={e => setSubject(e.target.value)}
            placeHolder={'Ecosystems, Biomes, etc.'}
          />
          <FormRow
            type="text"
            labelText="Grade Level:"
            name="gradeLevel"
            value={gradeLevel}
            handleChange={e => setGradeLevel(e.target.value)}
            placeHolder={'Year 9, chemistry'}
          />
          <div className="label-row" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Quiz Shoulder Cover:</label>
            <div className="idea-button">
              <button
                disabled={isLoading}
                className="ai-generate"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #a665ff',
                }}
                onClick={handleStandardGeneration}
              >
                {!isLoading && (
                  <>
                    <IoBulbSharp
                      style={{ color: '#a665ff', fontSize: '1rem' }}
                    />
                  </>
                )}
                {isLoading && (
                  <RingLoader color={'#7d5ff5'} loading={isLoading} size={20} />
                )}
              </button>
            </div>
          </div>
          <textarea
            className="quiz-textarea"
            placeholder="This quiz should include questions related to...&#13;&#10; ‎ &#13;&#10;- The components that make up an ecosystem &#13;&#10; ‎ &#13;&#10;- The role of producers, consumers, and decomposers in an ecosystem &#13;&#10; ‎ &#13;&#10; - The importance of biodiversity in an ecosystem &#13;&#10; ‎ &#13;&#10;- How energy flows through an ecosystem"
            value={quizCovers}
            onChange={e => setQuizCovers(e.target.value)}
          />
        </form>
        <button
          className="btn btn-block"
          type="submit"
          disabled={
            isLoading ||
            subject === '' ||
            gradeLevel === '' ||
            quizCovers === ''
          }
          onClick={submitQuiz}
        >
          {isLoading ? (
            <RiseLoader color={'white'} loading={isLoading} size={7} />
          ) : // if const [keys, setKeys] = useState([]); is in its initial state of an empty array, then show 'Generate 5 Questions', else show 'New Quiz'
          keys.length === 0 ? (
            'Generate 5 Questions'
          ) : (
            'New Quiz'
          )}
        </button>
      </div>
    </div>
  );
};
export default AssessmentBuilder;
