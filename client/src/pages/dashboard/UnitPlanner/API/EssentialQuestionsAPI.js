// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// CSS & Design Component Imports
import { decode } from 'html-entities';
import RingLoader from 'react-spinners/RingLoader';
import '../API/RegenButtons/overview.css';
import { IoRefreshSharp } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase Imports
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../../firebase.config';
import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

///////////////////////////
//
// COMPONENT STARTS HERE
//
///////////////////////////

const EssentialQuestionsButton = ({
  title,
  day,
  unitName,
  overview,
  dayNumber,
}) => {
  // API Request & Response States

  const [studentObjectives, setStudentObjectives] = useState('');
  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentHasChanged, setDocumentHasChanged] = useState(false);
  const [documentSnap, setDocumentSnap] = useState('default snap');
  const [fileIsReady, setFileIsReady] = useState(false);

  const { unitID } = useParams();
  let overviewText = overview;
  const lessonOverviewText = overview.replace(/<br\s*\/?>/g, '');

  const notify = () =>
    toast('🦄 Essential Questions on their way!', {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  function nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === 'undefined' ? '<br/>' : '<br>';
    return (str + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n){2,}/g,
      '$1' + breakTag + '$2'
    );
  }

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

  async function checkIfLessonOverview(dayNumber) {
    const docRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(docRef);
    const day = docSnap.get(dayNumber).essentialquestions;
    setDocumentSnap(<div>{day}</div>);
  }

  useEffect(() => {
    checkIfLessonOverview(dayNumber);
  }, []);

  async function fetchApi(overview) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      overview,
    });

    console.log('raw ===', raw);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/essentialQuestionsCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('essentialQuestionsCompletion ===', result);
        let textResult = result.choices[0].text;
        setCompletion({
          generatedText: textResult,
        });

        setDocumentHasChanged(true);

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setDocumentHasChanged(false);
        }, 100);

        setStudentObjectives(nl2br(textResult));

        const dataToSave = {
          overview,
          application: 'Essential Questions',
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

        setIsLoading(false);
      })
      .catch(error => console.log('error', error));
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!overview) {
      return;
    }
    notify();
    fetchApi(overview);
  };

  useEffect(() => {
    if (documentHasChanged) {
      saveObjectives(dayNumber);
    }
  }, [documentHasChanged, studentObjectives]);

  const saveObjectives = async (dayNumber, unitDetails) => {
    async function updateDay(dayNumber) {
      const docRef = doc(db, 'units', unitID);
      const docSnap = await getDoc(docRef);
      const day = docSnap.get(dayNumber);

      const updatedDay = {
        ...day,
        essentialquestions: `${nl2br(studentObjectives)}`,
      };
      await updateDoc(docRef, { [dayNumber]: updatedDay });
    }

    await updateDay(dayNumber);
    setFileIsReady(true);
  };

  const [buttonJSX, setButtonJSX] = useState(null);

  async function getUnitDetails() {
    const auth = getAuth();
    const user = auth.currentUser;
    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);

    if (await docSnap.data()[dayNumber].essentialquestions) {
      const snap = await docSnap.data()[dayNumber].essentialquestions;
      setButtonJSX(
        <div className="lessonoverview-container">
          <div
            className="lessontext-container"
            style={{ padding: '1rem' }}
            dangerouslySetInnerHTML={{
              __html: snap.replace(
                /\n/g,
                '<p style="margin-top: 0.3em; margin-bottom: 0.3em;">'
              ),
            }}
          ></div>
          <div className="lessonregen-container" onClick={handleSubmit}>
            {isLoading ? (
              <RingLoader color={'#7d5ff5'} loading={isLoading} size={20} />
            ) : (
              <IoRefreshSharp
                style={{
                  color: '#7d5ff5',
                  fontSize: '1rem',
                }}
                className="ai-generate-icon"
              />
            )}
          </div>
        </div>
      );
    } else {
      setButtonJSX(
        isLoading ? (
          <div className="objectives-loader">
            <RingLoader color={'#7d5ff5'} loading={isLoading} size={50} />
          </div>
        ) : (
          <button
            className="btn btn-block btn-primary"
            type="submit"
            onClick={handleSubmit}
            style={{
              margin: '1.5rem',
              width: '300px',
              alignSelf: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginRight: '5px',
                marginBottom: '3px',
              }}
            >
              +
            </span>{' '}
            Essential Questions
          </button>
        )
      );
    }
  }

  useEffect(() => {
    getUnitDetails();
  }, [documentSnap, isLoading]);

  useEffect(() => {
    if (fileIsReady) {
      // Map over the array of lines and create a div for each line
      setButtonJSX(
        <div className="lessonoverview-container">
          <div
            className="lessontext-container"
            style={{ padding: '1rem' }}
            dangerouslySetInnerHTML={{
              __html: studentObjectives.replace(
                /\n/g,
                '<p style="margin-top: 0.3em; margin-bottom: 0.3em;">'
              ),
            }}
          />
          <div className="lessonregen-container" onClick={handleSubmit}>
            {isLoading ? (
              <RingLoader color={'#7d5ff5'} loading={isLoading} size={20} />
            ) : (
              <IoRefreshSharp
                style={{
                  color: '#7d5ff5',
                  fontSize: '1rem',
                }}
                className="ai-generate-icon"
              />
            )}
          </div>
        </div>
      );
    }
  }, [fileIsReady, studentObjectives]);

  return <div className="objectivestext-container">{buttonJSX}</div>;
};

export default EssentialQuestionsButton;
