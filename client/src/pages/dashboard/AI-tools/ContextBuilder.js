// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

// CSS & Design Component Imports
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import Wrapper from '../../../assets/wrappers/InputForm';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { ImDownload, ImHistory, ImArrowLeft2 } from 'react-icons/im';
import printIcon from '../../../assets/svg/noun-print.svg';

import './PDFCSS.css';

// PDF Imports
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PDF from './ContextPDF';
import { Document, Page } from 'react-pdf';

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

const ContextBuilder = () => {
  // PDF File States
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfJSX, setPdfJSX] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [placeholder, setPlaceholder] = useState({});

  // Vocabulary Handout States
  const [terms, setTerms] = useState('');
  const [firstWord, setFirstWord] = useState('');
  const [firstDefinition, setFirstDefinition] = useState('');
  const [firstExample, setFirstExample] = useState('');
  const [firstExample2, setFirstExample2] = useState('');
  const [secondWord, setSecondWord] = useState('');
  const [secondDefinition, setSecondDefinition] = useState('');
  const [secondExample, setSecondExample] = useState('');
  const [secondExample2, setSecondExample2] = useState('');
  const [thirdWord, setThirdWord] = useState('');
  const [thirdDefinition, setThirdDefinition] = useState('');
  const [thirdExample, setThirdExample] = useState('');
  const [thirdExample2, setThirdExample2] = useState('');
  const [fourthWord, setFourthWord] = useState('');
  const [fourthDefinition, setFourthDefinition] = useState('');
  const [fourthExample, setFourthExample] = useState('');
  const [fourthExample2, setFourthExample2] = useState('');
  const [fifthWord, setFifthWord] = useState('');
  const [fifthDefinition, setFifthDefinition] = useState('');
  const [fifthExample, setFifthExample] = useState('');
  const [fifthExample2, setFifthExample2] = useState('');
  const [sixthWord, setSixthWord] = useState('');
  const [sixthDefinition, setSixthDefinition] = useState('');
  const [sixthExample, setSixthExample] = useState('');
  const [sixthExample2, setSixthExample2] = useState('');
  const [seventhWord, setSeventhWord] = useState('');
  const [seventhDefinition, setSeventhDefinition] = useState('');
  const [seventhExample, setSeventhExample] = useState('');
  const [seventhExample2, setSeventhExample2] = useState('');
  const [eighthWord, setEighthWord] = useState('');
  const [eighthDefinition, setEighthDefinition] = useState('');
  const [eighthExample, setEighthExample] = useState('');
  const [eighthExample2, setEighthExample2] = useState('');
  const [ninthWord, setNinthWord] = useState('');
  const [ninthDefinition, setNinthDefinition] = useState('');
  const [ninthExample, setNinthExample] = useState('');
  const [ninthExample2, setNinthExample2] = useState('');
  const [tenthWord, setTenthWord] = useState('');
  const [tenthDefinition, setTenthDefinition] = useState('');
  const [tenthExample, setTenthExample] = useState('');
  const [tenthExample2, setTenthExample2] = useState('');

  // API Request & Response States

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      `${window.location.origin}/api/v1/completions/vocabCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('Context Builder ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        // First Definition
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

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setDocumentHasChanged(false);
        }, 100);

        const dataToSave = {
          subject,
          gradeLevel,
          application: 'Context Builder',
          generatedText: result.choices[0].text,
        };

        // Save the completion to the database, then set the completion state, then log the ref, then catch any errors
        saveCompletionToDB('completions', dataToSave)
          .then(ref => {
            setCompletion({
              ...dataToSave,
              id: ref.id,
            });
            console.log('Saved successfully, ref: ', ref);
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
    fetchApi(subject, gradeLevel);
  };

  const createPDF = async () => {
    // Create a blob from the PDF component
    const blob = await pdf(
      <PDF
        subject={subject}
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
        firstExample2={firstExample2}
        secondDefinition={secondDefinition}
        secondExample={secondExample}
        secondExample2={secondExample2}
        thirdDefinition={thirdDefinition}
        thirdExample={thirdExample}
        thirdExample2={thirdExample2}
        fourthDefinition={fourthDefinition}
        fourthExample={fourthExample}
        fourthExample2={fourthExample2}
        fifthDefinition={fifthDefinition}
        fifthExample={fifthExample}
        fifthExample2={fifthExample2}
        sixthDefinition={sixthDefinition}
        sixthExample={sixthExample}
        sixthExample2={sixthExample2}
        seventhDefinition={seventhDefinition}
        seventhExample={seventhExample}
        seventhExample2={seventhExample2}
        eighthDefinition={eighthDefinition}
        eighthExample={eighthExample}
        eighthExample2={eighthExample2}
        ninthDefinition={ninthDefinition}
        ninthExample={ninthExample}
        ninthExample2={ninthExample2}
        tenthDefinition={tenthDefinition}
        tenthExample={tenthExample}
        tenthExample2={tenthExample2}
      />
    ).toBlob();

    // Get the current user and the storage service and the user id
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const userId = user.uid;

    // Creates a reference to the file we want to upload and where we want to upload it
    const storageRef = ref(
      storage,
      `users/${userId}/context-builder/${subject} Context Builder${Date.now()}.pdf`
    );

    console.log('storageRef ===', storageRef);

    await uploadBytes(storageRef, blob).then(snapshot => {
      console.log('Uploaded a blob or file!', snapshot);
    });

    // Gets the download URL for the file
    const fileUrl = await getDownloadURL(storageRef);
    setFileUrl(fileUrl);
  };

  // Uploads the file to the storage reference

  // React Hooks
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

  const handleDownload = () => {
    const fileName = `EducationalHandout-${Date.now()}.pdf`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(pdfBlob);
    a.download = fileName;
    a.click();
  };

  const handlePrint = () => {
    const fileName = `EducationalHandout-${Date.now()}.pdf`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(pdfBlob);
    a.target = '_blank';
    a.click();
  };

  const placeholders = [
    {
      topic: 'daily life in ancient egypt',
      gradeLevel: 'Year 6 World History',
    },
    {
      topic: 'Introduction to the periodic table',
      gradeLevel: 'Chemistry',
    },
    {
      topic: 'Causes and effects of brain drain',
      gradeLevel: 'AP Human Geography',
    },
    {
      topic: 'The Great Depression',
      gradeLevel: '7th grade US History',
    },
    {
      topic: 'Introduction to macroeconomics',
      gradeLevel: 'High school economics class',
    },
    {
      topic: 'Parts of the human brain',
      gradeLevel: 'Biology',
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
                <h4 className="pageTitle">Context Builder ⚡</h4>
                {/* <Model /> */}
              </div>
              <FormRow
                type="text"
                labelText="Topic:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
                placeHolder={placeholder.topic}
              />
              <FormRow
                type="text"
                labelText="Course:"
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
                {isLoading ? 'Please Wait...' : 'Generate Context Builder'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5 className="subHeadline">
              The Context Builder is a great tool to help you scaffold and build
              upon information throughout your lesson. Ensuring your students
              have a comprehensive understanding of the subject.
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
            <a href="creations/context-builders" target="_blank">
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
                  Your handout will appear here, once it is available for
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

export default ContextBuilder;
