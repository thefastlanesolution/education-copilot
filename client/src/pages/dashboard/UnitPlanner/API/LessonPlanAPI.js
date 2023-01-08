// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// CSS & Design Component Imports
import { decode } from 'html-entities';
import './UnitDay.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// PDF Imports
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PDF from '../../AI-tools/LessonPDF';

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

const LessonPlanButton = ({ overview, dayNumber, unitDetails }) => {
  // PDF File States
  const [fileUrl, setFileUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [lessonPlan, setLessonPlan] = useState('');

  // Lesson Plan Section States
  const [aimSection, setAimSection] = useState('');
  const [objectivesSection, setObjectivesSection] = useState('');
  const [materialsSection, setMaterialsSection] = useState('');
  const [anticipatorySection, setAnticipatorySection] = useState('');
  const [modeledSection, setModeledSection] = useState('');
  const [guidedSection, setGuidedSection] = useState('');
  const [independentPractice, setIndependentPractice] = useState('');
  const [struggleSection, setStruggleSection] = useState('');
  const [closureSection, setClosureSection] = useState('');

  // API Request & Response States

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentHasChanged, setDocumentHasChanged] = useState(false);
  const [documentSnap, setDocumentSnap] = useState(null);
  const [fileIsReady, setFileIsReady] = useState(false);

  const { unitID } = useParams();
  let overviewText = overview;

  const notify = () =>
    toast('📝 Lesson Plan coming right up!', {
      position: 'top-left',
      autoClose: 70000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: 'light',
      toastId: 'lessonplanunit',
    });

  // Async function to save the document to the database

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
    setDocumentSnap(docSnap.data());
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
      `${window.location.origin}/api/v1/completions/lessonPlanCompletionUnit`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('lessonPlanCompletionUnit ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        // Aim
        var regex = /<aim>(.*?)<\/aim>/s;
        var matchAim = textResult.match(regex);
        console.log('Aim Match ====', matchAim[1]);
        setAimSection(matchAim[1]);

        // Objectives
        var regex = /<objectives>(.*?)<\/objectives>/s;
        var matchObjectives = textResult.match(regex);
        console.log('Objectives Match ====', matchObjectives[1]);
        setObjectivesSection(matchObjectives[1]);

        // Materials Needed
        var regex = /<materials>(.*?)<\/materials>/s;
        var matchMaterials = textResult.match(regex);
        console.log('Materials Match ====', matchMaterials[1]);
        setMaterialsSection(matchMaterials[1]);

        // Anticipatory Set
        var regex = /<anticipatory>(.*?)<\/anticipatory>/s;
        var matchAnticipatory = textResult.match(regex);
        //console.log('Objectives Match ====', matchAnticipatory[1]);
        setAnticipatorySection(matchAnticipatory[1]);

        // Modeled Practice
        var regex = /<modeled>(.*?)<\/modeled>/s;
        var matchModeled = textResult.match(regex);
        //console.log('Aim Match ====', matchModeled[1]);
        setModeledSection(matchModeled[1]);

        // Guided Practice
        var regex = /<guided>(.*?)<\/guided>/s;
        var matchGuided = textResult.match(regex);
        //console.log('Objectives Match ====', matchGuided[1]);
        setGuidedSection(matchGuided[1]);

        // Independent Practice
        var regex = /<independent>(.*?)<\/independent>/s;
        var matchIndependent = textResult.match(regex);
        // console.log('Aim Match ====', matchIndependent[1]);
        setIndependentPractice(matchIndependent[1]);

        // Struggle
        var regex = /<struggles>(.*?)<\/struggles>/s;
        var matchStruggle = textResult.match(regex);
        // console.log('Objectives Match ====', matchStruggle[1]);
        setStruggleSection(matchStruggle[1]);

        // Closure
        var regex = /<closure>(.*?)<\/closure>/s;
        var matchClosure = textResult.match(regex);
        console.log('Aim Match ====', matchClosure[1]);
        setClosureSection(matchClosure[1]);

        setDocumentHasChanged(true);

        console.log('documentHasChanged ===', documentHasChanged);

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setDocumentHasChanged(false);
        }, 100);

        console.log('documentHasChanged ===', documentHasChanged);

        const dataToSave = {
          subject,
          gradeLevel,
          overviewText,
          application: 'Lesson Planner V2',
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

  const handleSubmit = event => {
    event.preventDefault();
    if (!overviewText) {
      console.log('Please enter a subject');
      return;
    }
    console.log('starting submit');
    setAimSection('');
    setObjectivesSection('');
    setMaterialsSection('');
    setAnticipatorySection('');
    setModeledSection('');
    setGuidedSection('');
    setIndependentPractice('');
    setStruggleSection('');
    setClosureSection('');
    console.log('reset states');
    notify();
    fetchApi(subject, gradeLevel, overviewText);
  };

  //Download PDF Functions

  const createPDF = async (dayNumber, unitDetails) => {
    console.log('createPDF function called');
    // Create a blob from the PDF component
    const blob = await pdf(
      <PDF
        subject={subject}
        gradeLevel={gradeLevel}
        aimSection={aimSection}
        objectivesSection={objectivesSection}
        materialsSection={materialsSection}
        anticipatorySection={anticipatorySection}
        modeledSection={modeledSection}
        guidedSection={guidedSection}
        independentPractice={independentPractice}
        struggleSection={struggleSection}
        closureSection={closureSection}
      />
    ).toBlob();

    toast.dismiss('lessonplanunit');
    setPdfBlob(blob);

    // Get the current user and the storage service and the user id
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const userId = user.uid;

    // Creates a reference to the file we want to upload and where we want to upload it
    const storageRef = ref(
      storage,
      `users/${userId}/lesson-plans/${subject} Lesson Plan${Date.now()}.pdf`
    );

    // Uploads the file to the storage reference
    await uploadBytes(storageRef, blob).then(snapshot => {
      console.log('PDF saved to Firebase');
    });

    // Gets the download URL for the file
    const fileUrl = await getDownloadURL(storageRef);
    setFileUrl(fileUrl);

    async function updateDay(dayNumber) {
      const docRef = doc(db, 'units', unitID);
      const docSnap = await getDoc(docRef);
      const day = docSnap.get(dayNumber);
      const updatedDay = { ...day, lessonplan: `${fileUrl}` };
      await updateDoc(docRef, { [dayNumber]: updatedDay });
    }

    await updateDay(dayNumber);
    setFileIsReady(true);
    setIsLoading(false);
    setSubject('');
    setGradeLevel('');
  };

  const handleDownload = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);
    const url = docSnap.data()[dayNumber].lessonplan;
    console.log('url ===', url);
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${dayNumber} Lesson Plan.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  // Anytime documentHasChanged changes, it will update the state

  useEffect(() => {
    if (documentHasChanged) {
      createPDF(dayNumber);
    }
  }, [documentHasChanged]);

  // GET UNIT DETAILS & RENDER BUTTONS
  async function getUnitDetails() {
    const auth = getAuth();
    const user = auth.currentUser;

    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);

    setLessonPlan(docSnap.data()[dayNumber].lessonplan);

    if (await docSnap.data()[dayNumber].lessonplan) {
      setButtonJSX(
        <button
          className="btn-primary"
          type="submit"
          onClick={handleDownload}
          style={{
            border: '1px dashed #1e90ff',
            marginBottom: '1.5rem',
            backgroundColor: '#1e90ff',
            color: 'white',
          }}
        >
          Lesson Plan
        </button>
      );
    } else {
      setButtonJSX(
        <button
          className="btn-primary"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          style={{
            marginBottom: '1.5rem',
          }}
        >
          {isLoading ? (
            <div className="buttonelements">
              <div className="buttonicon"></div>
              <div className="buttontext">Loading...</div>
            </div>
          ) : (
            <div className="buttonelements">
              <div className="buttonicon">+</div>
              <div className="buttontext">Lesson Plan</div>
            </div>
          )}
        </button>
      );
    }
  }

  useEffect(() => {
    getUnitDetails();
  }, [, isLoading]);

  const [buttonJSX, setButtonJSX] = useState(null);

  useEffect(() => {
    if (fileUrl) {
      setButtonJSX(
        <button
          className="btn-primary"
          type="submit"
          onClick={handleDownload}
          style={{
            border: '1px dashed #1e90ff',
            marginBottom: '1.5rem',
            backgroundColor: '#1e90ff',
            color: 'white',
          }}
        >
          Lesson Plan
        </button>
      );
    }
  }, [fileIsReady]);

  return <div>{buttonJSX}</div>;
};

export default LessonPlanButton;
