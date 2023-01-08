// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// CSS & Design Component Imports
import { decode } from 'html-entities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// PDF Imports
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PDF from '../../AI-tools/EducationalPDF';

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

const EducationalHandoutAPI = ({ overview, dayNumber, unitDetails }) => {
  // PDF File States
  const [fileUrl, setFileUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [lessonPlan, setLessonPlan] = useState('');

  // Educational Handout States

  const [title, setTitle] = useState('');
  const [covers, setCovers] = useState('');
  const [header1, setHeader1] = useState('');
  const [body1, setBody1] = useState('');
  const [header2, setHeader2] = useState('');
  const [body2, setBody2] = useState('');
  const [header3, setHeader3] = useState('');
  const [body3, setBody3] = useState('');
  const [header4, setHeader4] = useState('');
  const [body4, setBody4] = useState('');
  const [header5, setHeader5] = useState('');
  const [body5, setBody5] = useState('');
  const [header6, setHeader6] = useState('');
  const [body6, setBody6] = useState('');
  const [header7, setHeader7] = useState('');
  const [body7, setBody7] = useState('');
  const [header8, setHeader8] = useState('');
  const [body8, setBody8] = useState('');

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
    toast('🤖 Handout on its way!', {
      position: 'top-left',
      autoClose: 70000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: 'light',
      toastId: 'educationalhandoutunit',
    });

  // console.log(unitDetails[dayNumber].lessonplan);

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
    console.log('documentSnap ===', docSnap.data().gradeLevel);
    setGradeLevel(docSnap.data().gradeLevel);
    console.log('gradeLevel ===', gradeLevel);
  }

  useEffect(() => {
    checkIfLessonPlan(dayNumber);
  }, [, gradeLevel]);

  async function fetchApi(
    subject,
    gradeLevel,
    overviewText,
    dayNumber,
    updateFunction
  ) {
    notify();
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
      `${window.location.origin}/api/v1/completions/educationalHandoutCompletionUnit`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('Educational Handout ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        //set the title to everything between <title> and </title>
        var regex = /<pdftitle>(.*?)<\/pdftitle>/s;
        var matchFirst = textResult.match(regex);
        setTitle(matchFirst[1]);

        // Set Covers
        var regex = /<handoutcovers>(.*?)<\/handoutcovers>/s;
        var matchFirstExample = textResult.match(regex);
        setCovers(matchFirstExample[1]);

        // Set First Header
        var regex = /<header1>(.*?)<\/header1>/s;
        var matchFirstHeader = textResult.match(regex);
        setHeader1(matchFirstHeader[1]);

        // Set Body1
        var regex = /<body1>(.*?)<\/body1>/s;
        var matchFirstBody = textResult.match(regex);
        setBody1(matchFirstBody[1]);

        // Set Header2
        var regex = /<header2>(.*?)<\/header2>/s;
        var matchSecondHeader = textResult.match(regex);
        setHeader2(matchSecondHeader[1]);

        // Set Body2
        var regex = /<body2>(.*?)<\/body2>/s;
        var matchSecondBody = textResult.match(regex);
        setBody2(matchSecondBody[1]);

        // Set Header3
        var regex = /<header3>(.*?)<\/header3>/s;
        var matchThirdHeader = textResult.match(regex);
        setHeader3(matchThirdHeader[1]);

        // Set Body3
        var regex = /<body3>(.*?)<\/body3>/s;
        var matchThirdBody = textResult.match(regex);
        setBody3(matchThirdBody[1]);

        // Set Header4
        var regex = /<header4>(.*?)<\/header4>/s;
        var matchFourthHeader = textResult.match(regex);
        setHeader4(matchFourthHeader[1]);

        // Set Body4
        var regex = /<body4>(.*?)<\/body4>/s;
        var matchFourthBody = textResult.match(regex);
        setBody4(matchFourthBody[1]);

        // Set Header5
        var regex = /<header5>(.*?)<\/header5>/s;
        var matchFifthHeader = textResult.match(regex);
        if (matchFifthHeader) {
          setHeader5(matchFifthHeader[1]);
        }

        // Set Body5 Conditionally if it exists, it might not
        var regex = /<body5>(.*?)<\/body5>/s;
        var matchFifthBody = textResult.match(regex);
        if (matchFifthBody) {
          setBody5(matchFifthBody[1]);
        }

        // Set Header 6 Conditionally if it exists, it might not
        var regex = /<header6>(.*?)<\/header6>/s;
        var matchSixthHeader = textResult.match(regex);
        if (matchSixthHeader) {
          setHeader6(matchSixthHeader[1]);
        }

        // Set Body 6 Conditionally if it exists, it might not
        var regex = /<body6>(.*?)<\/body6>/s;
        var matchSixthBody = textResult.match(regex);
        if (matchSixthBody) {
          setBody6(matchSixthBody[1]);
        }

        // Set Header 7 Conditionally if it exists, it might not
        var regex = /<header7>(.*?)<\/header7>/s;
        var matchSeventhHeader = textResult.match(regex);
        if (matchSeventhHeader) {
          setHeader7(matchSeventhHeader[1]);
        }

        // Set Body 7 Conditionally if it exists, it might not
        var regex = /<body7>(.*?)<\/body7>/s;
        var matchSeventhBody = textResult.match(regex);
        if (matchSeventhBody) {
          setBody7(matchSeventhBody[1]);
        }

        // Set Header 8 Conditionally if it exists, it might not
        var regex = /<header8>(.*?)<\/header8>/s;
        var matchEighthHeader = textResult.match(regex);
        if (matchEighthHeader) {
          setHeader8(matchEighthHeader[1]);
        }

        // Set Body 8 Conditionally if it exists, it might not
        var regex = /<body8>(.*?)<\/body8>/s;
        var matchEighthBody = textResult.match(regex);
        if (matchEighthBody) {
          setBody8(matchEighthBody[1]);
        }

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
          application: 'Educational Handout',
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
    setCovers('');
    setHeader1('');
    setBody1('');
    setHeader2('');
    setBody2('');
    setHeader3('');
    setBody3('');
    setHeader4('');
    setBody4('');
    setHeader5('');
    setBody5('');
    setHeader6('');
    setBody6('');
    setHeader7('');
    setBody7('');
    setHeader8('');
    setBody8('');
    console.log('reset states');
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
        title={title}
        covers={covers}
        header1={header1}
        body1={body1}
        header2={header2}
        body2={body2}
        header3={header3}
        body3={body3}
        header4={header4}
        body4={body4}
        header5={header5}
        body5={body5}
        header6={header6}
        body6={body6}
        header7={header7}
        body7={body7}
        header8={header8}
        body8={body8}
      />
    ).toBlob();

    toast.dismiss('educationalhandoutunit');
    setPdfBlob(blob);

    // Get the current user and the storage service and the user id
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const userId = user.uid;

    // Creates a reference to the file we want to upload and where we want to upload it
    const storageRef = ref(
      storage,
      `users/${userId}/lesson-plans/${subject} Educational Handout${Date.now()}.pdf`
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
      const updatedDay = { ...day, educationalhandout: `${fileUrl}` };
      await updateDoc(docRef, { [dayNumber]: updatedDay });
    }

    await updateDay(dayNumber);
    setIsLoading(false);
    setFileIsReady(true);
  };

  const handleDownload = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);
    const url = docSnap.data()[dayNumber].educationalhandout;
    console.log('url ===', url);
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${dayNumber} Educational Handout.pdf`);
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

  async function getUnitDetails() {
    const auth = getAuth();
    const user = auth.currentUser;

    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);

    setLessonPlan(docSnap.data()[dayNumber].educationalhandout);

    if (await docSnap.data()[dayNumber].educationalhandout) {
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
          Educational Handout
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
              <div className="buttontext">Educational Handout</div>
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
          Educational Handout
        </button>
      );
    }
  }, [fileIsReady]);

  return <div>{buttonJSX}</div>;
};

export default EducationalHandoutAPI;
