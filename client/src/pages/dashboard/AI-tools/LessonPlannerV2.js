// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

// CSS & Design Component Imports
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import Wrapper from '../../../assets/wrappers/InputForm';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { ImDownload, ImArrowLeft2, ImHistory } from 'react-icons/im';
import printIcon from '../../../assets/svg/noun-print.svg';
import './PDFCSS.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from 'react-spinners/RiseLoader';

// PDF Imports
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf';
import PDF from './LessonPDF';

// Firebase Imports
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../firebase.config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

///////////////////////////
//
// COMPONENT STARTS HERE
//
///////////////////////////

const LessonPlannerV2 = () => {
  // PDF File States
  const [placeholder, setPlaceholder] = useState({});
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfJSX, setPdfJSX] = useState(null);

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

  const notify = () =>
    toast('🦄 Lesson plan coming right up!', {
      position: 'top-right',
      autoClose: 70000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: 'light',
    });

  // API Request & Response States

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // add the documentHasChanged state hook
  const [documentHasChanged, setDocumentHasChanged] = useState(false);

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

  // API Request Function to get the generated text and set the states for the lesson plan sections

  async function fetchApi(subject, gradeLevel) {
    setIsLoading(true);
    notify();
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
      `${window.location.origin}/api/v1/completions/lessonPlannerV2Completion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('lessonPlannerV2Completion ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        // Aim
        var regex = /<aim>(.*?)<aim>/s;
        var matchAim = textResult.match(regex);
        console.log('Aim Match ====', matchAim[1]);
        setAimSection(matchAim[1]);

        // Objectives
        var regex = /<objectives>(.*?)<objectives>/s;
        var matchObjectives = textResult.match(regex);
        console.log('Objectives Match ====', matchObjectives[1]);
        setObjectivesSection(matchObjectives[1]);

        // Materials Needed
        var regex = /<materials>(.*?)<materials>/s;
        var matchMaterials = textResult.match(regex);
        console.log('Materials Match ====', matchMaterials[1]);
        setMaterialsSection(matchMaterials[1]);

        // Anticipatory Set
        var regex = /<anticipatory>(.*?)<anticipatory>/s;
        var matchAnticipatory = textResult.match(regex);
        //console.log('Objectives Match ====', matchAnticipatory[1]);
        setAnticipatorySection(matchAnticipatory[1]);

        // Modeled Practice
        var regex = /<modeled>(.*?)<modeled>/s;
        var matchModeled = textResult.match(regex);
        //console.log('Aim Match ====', matchModeled[1]);
        setModeledSection(matchModeled[1]);

        // Guided Practice
        var regex = /<guided>(.*?)<guided>/s;
        var matchGuided = textResult.match(regex);
        //console.log('Objectives Match ====', matchGuided[1]);
        setGuidedSection(matchGuided[1]);

        // Independent Practice
        var regex = /<independent>(.*?)<independent>/s;
        var matchIndependent = textResult.match(regex);
        // console.log('Aim Match ====', matchIndependent[1]);
        setIndependentPractice(matchIndependent[1]);

        // Struggle
        var regex = /<struggles>(.*?)<struggles>/s;
        var matchStruggle = textResult.match(regex);
        // console.log('Objectives Match ====', matchStruggle[1]);
        setStruggleSection(matchStruggle[1]);

        // Closure
        var regex = /<closure>(.*?)<closure>/s;
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
    if (!subject) {
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
    fetchApi(subject, gradeLevel);
  };

  //Download PDF Functions

  const createPDF = async () => {
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

    toast.dismiss();
    setPdfBlob(blob);

    console.log('pdfBlob ===', pdfBlob);

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

    console.log('storageRef ===', storageRef);

    // Uploads the file to the storage reference
    await uploadBytes(storageRef, blob).then(snapshot => {
      console.log('PDF saved to Firebase');
    });

    // Gets the download URL for the file
    const fileUrl = await getDownloadURL(storageRef);
    setFileUrl(fileUrl);

    console.log('fileUrl ===', fileUrl);

    setSubject('');
    setGradeLevel('');
  };

  const handleDownload = () => {
    const fileName = `${subject} Lesson Plan${Date.now()}.pdf`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(pdfBlob);
    a.download = fileName;
    a.click();
  };

  // Anytime documentHasChanged changes, it will update the state

  useEffect(() => {
    if (documentHasChanged) {
      createPDF();
    }
  }, [documentHasChanged]);

  // PDF Navigation Functions

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  // Anytime the fileUrl changes, it will update the state
  useEffect(() => {
    setFileUrl(fileUrl);

    // After setting the file URL, render the JSX HTML below

    if (fileUrl) {
      setPdfJSX(
        <div className="userActions">
          <div className="printButton">
            <img src={printIcon} className="printIcon" onClick={handlePrint} />
          </div>
          <div className="downloadbutton">
            <button
              type="button"
              disabled={fileUrl === ''}
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      );
    }
  }, [fileUrl]);

  const handlePrint = () => {
    const fileName = `EducationalHandout-${Date.now()}.pdf`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(pdfBlob);
    a.target = '_blank';
    a.click();
  };

  const placeholders = [
    {
      topic: 'An outdoor experiment that teaches about chemical reactions',
      gradeLevel: 'Year 6, science',
    },
    {
      topic: 'Introduction to solar systems',
      gradeLevel: '5th grade, science',
    },
    {
      topic: 'How Ecosystems are formed and how they work',
      gradeLevel: 'biology - year 9',
    },
    {
      topic: 'A lesson on the history of the American Revolution',
      gradeLevel: '8th grade, US history',
    },
    {
      topic: 'Astrodynamics - how to calculate orbital periods',
      gradeLevel: 'college level, physics',
    },
    {
      topic: 'The history of Chinese dynasties',
      gradeLevel: '9th grade, world history',
    },
    // unique educational topics
    {
      topic: "maslow's hierarchy of needs",
      gradeLevel: 'psychology',
    },
  ];

  useEffect(() => {
    setPlaceholder(
      placeholders[Math.floor(Math.random() * placeholders.length)]
    );
  }, []);

  return (
    <Wrapper>
      <Card
        sx={{
          backgroundColor: '#f8fafc',
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '0px',
          paddingTop: '.7rem',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.25)',
          },
          boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.15)',
        }}
        className="input-card"
      >
        <CardContent>
          <div className="historylink">
            <Link to={'../workshop'}>
              {<ImArrowLeft2 className="historyicon" />}Workshop
            </Link>
          </div>
          <form className="aiForm" onSubmit={handleSubmit}>
            <div className="form-center">
              <div className="titleAndVideo">
                <h4 className="pageTitle">Lesson Planner ⚡</h4>
                {/* <Model /> */}
              </div>
              <FormRow
                type="text"
                labelText="Topic or lesson"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
                placeHolder={placeholder.topic}
              />
              <FormRow
                type="text"
                labelText="Course"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
                placeHolder={placeholder.gradeLevel}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RiseLoader color={'white'} loading={isLoading} size={7} />
                ) : (
                  'Generate Lesson Plan'
                )}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5 className="subHeadline">
              Save time and quickly draft lesson plans for any subject matter.
            </h5>
          </div>
        </CardContent>
      </Card>
      <Card
        className="pdfCard"
        sx={{
          borderRadius: '0px',
          backgroundColor: '#f8f8f8',
        }}
      >
        <div className="pageControls">
          <div className="historylink">
            <a href="creations/lesson-plans" target="_blank">
              {<ImHistory className="historyicon" />} History
            </a>
          </div>
          <div>{pdfJSX}</div>
        </div>
        <div className="pdfContainer">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="renderedPDF"
            noData={
              <div className="preview">
                <div className="preview-text">
                  Your lesson plan will appear here, once it is available for
                  download.
                </div>
                <div className="preview-icon">
                  {<ImDownload className="icon" />}
                </div>
              </div>
            }
          >
            <Page scale={0.8} pageNumber={1} />
            <br />
            {numPages > 1 && <Page scale={0.8} pageNumber={2} />}
            <br />
            {numPages > 2 && <Page scale={0.8} pageNumber={3} />}
            <br />
            {numPages > 3 && <Page scale={0.8} pageNumber={4} />}
          </Document>
        </div>
      </Card>
    </Wrapper>
  );
};

export default LessonPlannerV2;
