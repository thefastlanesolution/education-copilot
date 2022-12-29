// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// CSS & Design Component Imports
import { decode } from 'html-entities';

// Firebase Imports
import { db } from '../../../../firebase.config';
import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

///////////////////////////
//
// COMPONENT STARTS HERE
//
///////////////////////////

const UnitIdeaButton = ({ overview, dayNumber, unitDetails }) => {
  // API Request & Response States

  const [studentObjectives, setStudentObjectives] = useState('');
  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [documentHasChanged, setDocumentHasChanged] = useState(false);
  const [documentSnap, setDocumentSnap] = useState('default snap');
  const [fileIsReady, setFileIsReady] = useState(false);

  const { unitID } = useParams();
  let overviewText = overview;

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

  async function checkIfLessonPlan(dayNumber) {
    const docRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(docRef);
    const day = docSnap.get(dayNumber).essentialquestions;
    const studentObjectives = await JSON.parse(day);
    setDocumentSnap(
      <ul>
        {studentObjectives.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  useEffect(() => {
    checkIfLessonPlan(dayNumber);
  }, []);

  async function fetchApi(
    subject,
    gradeLevel,
    overviewText,
    dayNumber,
    updateFunction
  ) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
      gradeLevel,
      overviewText,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/unitIdeaCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('unitIdeaCompletion ===', result);
        let textResult = result.choices[0].text;
        setCompletion({
          generatedText: textResult,
        });

        setDocumentHasChanged(true);

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setDocumentHasChanged(false);
        }, 100);

        let lines = result.choices[0].text.split('\n');
        setStudentObjectives(lines);

        const dataToSave = {
          subject,
          gradeLevel,
          overviewText,
          application: 'Student Objectives',
          generatedText: result.choices[0].text,
          lines: lines,
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

  const handleSubmit = event => {
    event.preventDefault();
    if (!overviewText) {
      return;
    }
    fetchApi(subject, gradeLevel, overviewText);
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
        essentialquestions: `${JSON.stringify(studentObjectives)}`,
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
      setButtonJSX(<div>{decode(documentSnap)}</div>);
    } else {
      setButtonJSX(
        <button
          className="btn btn-block"
          type="submit"
          onClick={handleSubmit}
          style={{
            backgroundColor: 'white',
            color: '#1e90ff',
            marginBottom: '1.5rem',
            border: '1px dashed #1e90ff',
            fontFamily: 'inter',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '300px',
            width: '100%',
          }}
        >
          Generate Questions
        </button>
      );
    }
  }

  useEffect(() => {
    getUnitDetails();
  }, [documentSnap]);

  useEffect(() => {
    if (fileIsReady) {
      // Map over the array of lines and create a div for each line
      setButtonJSX(
        studentObjectives.map((line, index) => {
          return <div key={index}>{line}</div>;
        })
      );
    }
  }, [fileIsReady]);

  return <div>{buttonJSX}</div>;
};

export default UnitIdeaButton;
