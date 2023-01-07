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
import PDF from '../../AI-tools/ContextPDF';

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

const ContextBuilderAPI = ({ overview, dayNumber, unitDetails }) => {
  // PDF File States
  const [fileUrl, setFileUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [lessonPlan, setLessonPlan] = useState('');

  // Lesson Plan Section States
  const [terms, setTerms] = useState('');
  const [firstWord, setFirstWord] = useState('');
  const [firstDefinition, setFirstDefinition] = useState('');
  const [firstExample, setFirstExample] = useState('');
  const [secondWord, setSecondWord] = useState('');
  const [secondDefinition, setSecondDefinition] = useState('');
  const [secondExample, setSecondExample] = useState('');
  const [thirdWord, setThirdWord] = useState('');
  const [thirdDefinition, setThirdDefinition] = useState('');
  const [thirdExample, setThirdExample] = useState('');
  const [fourthWord, setFourthWord] = useState('');
  const [fourthDefinition, setFourthDefinition] = useState('');
  const [fourthExample, setFourthExample] = useState('');
  const [fifthWord, setFifthWord] = useState('');
  const [fifthDefinition, setFifthDefinition] = useState('');
  const [fifthExample, setFifthExample] = useState('');
  const [sixthWord, setSixthWord] = useState('');
  const [sixthDefinition, setSixthDefinition] = useState('');
  const [sixthExample, setSixthExample] = useState('');
  const [seventhWord, setSeventhWord] = useState('');
  const [seventhDefinition, setSeventhDefinition] = useState('');
  const [seventhExample, setSeventhExample] = useState('');
  const [eighthWord, setEighthWord] = useState('');
  const [eighthDefinition, setEighthDefinition] = useState('');
  const [eighthExample, setEighthExample] = useState('');
  const [ninthWord, setNinthWord] = useState('');
  const [ninthDefinition, setNinthDefinition] = useState('');
  const [ninthExample, setNinthExample] = useState('');
  const [tenthWord, setTenthWord] = useState('');
  const [tenthDefinition, setTenthDefinition] = useState('');
  const [tenthExample, setTenthExample] = useState('');

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
    toast('🚀 Generating Context Builder!', {
      position: 'top-left',
      autoClose: 70000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
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
    setDocumentSnap(docSnap.data().gradeLevel);
    setGradeLevel(docSnap.data()[gradeLevel]);
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
      `${window.location.origin}/api/v1/completions/contextBuilderCompletionUnit`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('Context Builder ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        var regex = /<definition1>(.*?)<definition1>/s;
        var matchFirst = textResult.match(regex);
        console.log('Aim Match ====', matchFirst[1]);
        setFirstDefinition(matchFirst[1]);

        // First Example
        var regex = /<example1>(.*?)<example1>/s;
        var matchFirstExample = textResult.match(regex);
        console.log('Aim Match ====', matchFirstExample[1]);
        setFirstExample(matchFirstExample[1]);

        // Second definition
        var regex = /<definition2>(.*?)<definition2>/s;
        var matchSecond = textResult.match(regex);
        console.log('Aim Match ====', matchSecond[1]);
        setSecondDefinition(matchSecond[1]);

        // Second Example
        var regex = /<example2>(.*?)<example2>/s;
        var matchSecondExample = textResult.match(regex);
        console.log('Aim Match ====', matchSecondExample[1]);
        setSecondExample(matchSecondExample[1]);

        // Third Definition
        var regex = /<definition3>(.*?)<definition3>/s;
        var matchThird = textResult.match(regex);
        console.log('Aim Match ====', matchThird[1]);
        setThirdDefinition(matchThird[1]);

        // Third Example
        var regex = /<example3>(.*?)<example3>/s;
        var matchThirdExample = textResult.match(regex);
        console.log('Aim Match ====', matchThirdExample[1]);
        setThirdExample(matchThirdExample[1]);

        // Fourth Definition
        var regex = /<definition4>(.*?)<definition4>/s;
        var matchFourth = textResult.match(regex);
        console.log('Aim Match ====', matchFourth[1]);
        setFourthDefinition(matchFourth[1]);

        // Fourth Example
        var regex = /<example4>(.*?)<example4>/s;
        var matchFourthExample = textResult.match(regex);
        console.log('Aim Match ====', matchFourthExample[1]);
        setFourthExample(matchFourthExample[1]);

        // Fifth Definition
        var regex = /<definition5>(.*?)<definition5>/s;
        var matchFifth = textResult.match(regex);
        console.log('Aim Match ====', matchFifth[1]);
        setFifthDefinition(matchFifth[1]);

        // Fifth Example
        var regex = /<example5>(.*?)<example5>/s;
        var matchFifthExample = textResult.match(regex);
        console.log('Aim Match ====', matchFifthExample[1]);
        setFifthExample(matchFifthExample[1]);

        // Sixth Definition
        var regex = /<definition6>(.*?)<definition6>/s;
        var matchSixth = textResult.match(regex);
        console.log('Aim Match ====', matchSixth[1]);
        setSixthDefinition(matchSixth[1]);

        // Sixth Example
        var regex = /<example6>(.*?)<example6>/s;
        var matchSixthExample = textResult.match(regex);
        console.log('Aim Match ====', matchSixthExample[1]);
        setSixthExample(matchSixthExample[1]);

        // Seventh Definition
        var regex = /<definition7>(.*?)<definition7>/s;
        var matchSeventh = textResult.match(regex);
        console.log('Aim Match ====', matchSeventh[1]);
        setSeventhDefinition(matchSeventh[1]);

        // Seventh Example
        var regex = /<example7>(.*?)<example7>/s;
        var matchSeventhExample = textResult.match(regex);
        console.log('Aim Match ====', matchSeventhExample[1]);
        setSeventhExample(matchSeventhExample[1]);

        // Eighth Definition
        var regex = /<definition8>(.*?)<definition8>/s;
        var matcheighth = textResult.match(regex);
        console.log('Aim Match ====', matcheighth[1]);
        setEighthDefinition(matcheighth[1]);

        // Eighth Example
        var regex = /<example8>(.*?)<example8>/s;
        var matchEighthExample = textResult.match(regex);
        console.log('Aim Match ====', matchEighthExample[1]);
        setEighthExample(matchEighthExample[1]);

        // Ninth Definition
        var regex = /<definition9>(.*?)<definition9>/s;
        var matchNinth = textResult.match(regex);
        console.log('Aim Match ====', matchNinth[1]);
        setNinthDefinition(matchNinth[1]);

        // Ninth Example
        var regex = /<example9>(.*?)<example9>/s;
        var matchNinthExample = textResult.match(regex);
        console.log('Aim Match ====', matchNinthExample[1]);
        setNinthExample(matchNinthExample[1]);

        // Tenth Definition
        var regex = /<definition10>(.*?)<definition10>/s;
        var matchTenth = textResult.match(regex);
        console.log('Aim Match ====', matchTenth[1]);
        setTenthDefinition(matchTenth[1]);

        // Tenth Example
        var regex = /<example10>(.*?)<example10>/s;
        var matchTenthExample = textResult.match(regex);
        console.log('Aim Match ====', matchTenthExample[1]);
        setTenthExample(matchTenthExample[1]);

        // First Word
        var regex = /<word1>(.*?)<word1>/s;
        var matchWord = textResult.match(regex);
        console.log('Aim Match ====', matchWord[1]);
        setFirstWord(matchWord[1]);

        // Second Word
        var regex = /<word2>(.*?)<word2>/s;
        var matchWord2 = textResult.match(regex);
        console.log('Aim Match ====', matchWord2[1]);
        setSecondWord(matchWord2[1]);

        // Third Word
        var regex = /<word3>(.*?)<word3>/s;
        var matchWord3 = textResult.match(regex);
        console.log('Aim Match ====', matchWord3[1]);
        setThirdWord(matchWord3[1]);

        // Fourth Word
        var regex = /<word4>(.*?)<word4>/s;
        var matchWord4 = textResult.match(regex);
        console.log('Aim Match ====', matchWord4[1]);
        setFourthWord(matchWord4[1]);

        // Fifth Word
        var regex = /<word5>(.*?)<word5>/s;
        var matchWord5 = textResult.match(regex);
        console.log('Aim Match ====', matchWord5[1]);
        setFifthWord(matchWord5[1]);

        // Sixth Word
        var regex = /<word6>(.*?)<word6>/s;
        var matchWord6 = textResult.match(regex);
        console.log('Aim Match ====', matchWord6[1]);
        setSixthWord(matchWord6[1]);

        // Seventh Word
        var regex = /<word7>(.*?)<word7>/s;
        var matchWord7 = textResult.match(regex);
        console.log('Aim Match ====', matchWord7[1]);
        setSeventhWord(matchWord7[1]);

        // Eighth Word
        var regex = /<word8>(.*?)<word8>/s;
        var matchWord8 = textResult.match(regex);
        console.log('Aim Match ====', matchWord8[1]);
        setEighthWord(matchWord8[1]);

        // Ninth Word
        var regex = /<word9>(.*?)<word9>/s;
        var matchWord9 = textResult.match(regex);
        console.log('Aim Match ====', matchWord9[1]);
        setNinthWord(matchWord9[1]);

        // Tenth Word
        var regex = /<word10>(.*?)<word10>/s;
        var matchWord10 = textResult.match(regex);
        console.log('Aim Match ====', matchWord10[1]);
        setTenthWord(matchWord10[1]);

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
    setFirstWord('');
    setSecondWord('');
    setThirdWord('');
    setFourthWord('');
    setFifthWord('');
    setSixthWord('');
    setSeventhWord('');
    setEighthWord('');
    setNinthWord('');
    setTenthWord('');
    setFirstDefinition('');
    setFirstExample('');
    setSecondDefinition('');
    setSecondExample('');
    setThirdDefinition('');
    setThirdExample('');
    setFourthDefinition('');
    setFourthExample('');
    setFifthDefinition('');
    setFifthExample('');
    setSixthDefinition('');
    setSixthExample('');
    setSeventhDefinition('');
    setSeventhExample('');
    setEighthDefinition('');
    setEighthExample('');
    setNinthDefinition('');
    setNinthExample('');
    setTenthDefinition('');
    setTenthExample('');
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
        firstWord={firstWord}
        secondWord={secondWord}
        thirdWord={thirdWord}
        fourthWord={fourthWord}
        fifthWord={fifthWord}
        sixthWord={sixthWord}
        seventhWord={seventhWord}
        eighthWord={eighthWord}
        ninthWord={ninthWord}
        tenthWord={tenthWord}
        firstDefinition={firstDefinition}
        firstExample={firstExample}
        secondDefinition={secondDefinition}
        secondExample={secondExample}
        thirdDefinition={thirdDefinition}
        thirdExample={thirdExample}
        fourthDefinition={fourthDefinition}
        fourthExample={fourthExample}
        fifthDefinition={fifthDefinition}
        fifthExample={fifthExample}
        sixthDefinition={sixthDefinition}
        sixthExample={sixthExample}
        seventhDefinition={seventhDefinition}
        seventhExample={seventhExample}
        eighthDefinition={eighthDefinition}
        eighthExample={eighthExample}
        ninthDefinition={ninthDefinition}
        ninthExample={ninthExample}
        tenthDefinition={tenthDefinition}
        tenthExample={tenthExample}
      />
    ).toBlob();

    setPdfBlob(blob);

    // Get the current user and the storage service and the user id
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const userId = user.uid;

    // Creates a reference to the file we want to upload and where we want to upload it
    const storageRef = ref(
      storage,
      `users/${userId}/lesson-plans/${subject} Context Builder${Date.now()}.pdf`
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
      const updatedDay = { ...day, contextbuilder: `${fileUrl}` };
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
    const url = docSnap.data()[dayNumber].contextbuilder;
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

  async function getUnitDetails() {
    const auth = getAuth();
    const user = auth.currentUser;

    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);

    setLessonPlan(docSnap.data()[dayNumber].contextbuilder);

    if (await docSnap.data()[dayNumber].contextbuilder) {
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
          Context Builder
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
              <div className="buttontext">Context Builder</div>
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
          Context Builder
        </button>
      );
    }
  }, [fileIsReady]);

  return <div>{buttonJSX}</div>;
};

export default ContextBuilderAPI;
