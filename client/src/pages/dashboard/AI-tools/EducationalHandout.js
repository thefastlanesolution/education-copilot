// React State Management Imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// CSS & Design Component Imports
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import Wrapper from '../../../assets/wrappers/InputForm';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { ImArrowLeft2, ImDownload, ImHistory } from 'react-icons/im';
import printIcon from '../../../assets/svg/noun-print.svg';
import './PDFCSS.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from 'react-spinners/RiseLoader';

// PDF Imports
import { pdf } from '@react-pdf/renderer';
import PDF from './EducationalPDF';
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

const EducationalHandout = () => {
  // PDF File States
  const [placeholder, setPlaceholder] = useState({});
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfJSX, setPdfJSX] = useState(null);

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

  const notify = () =>
    toast('🛸 Generating Educational Handout!', {
      position: 'top-right',
      autoClose: 65000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: 'light',
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

  // API Request Function to get the generated text and set the states for the lesson plan sections

  async function fetchApi(subject, gradeLevel) {
    notify();
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
      `${window.location.origin}/api/v1/completions/educationalHandoutCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('Educational Handout ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        console.log('Text Result ===', textResult);

        //set the title to everything between <title> and </title>
        var regex = /<title>(.*?)<\/title>/s;
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

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setDocumentHasChanged(false);
        }, 100);

        const dataToSave = {
          subject,
          gradeLevel,
          application: 'Educational Handout V2',
          generatedText: result.choices[0].text,
        };
      })
      .catch(error => console.log('error', error));
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      console.log('Please enter a subject');
      return;
    }
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
    fetchApi(subject, gradeLevel);
  };

  const createPDF = async () => {
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

    toast.dismiss();
    setPdfBlob(blob);

    // Get the current user and the storage service and the user id
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const userId = user.uid;

    // Creates a reference to the file we want to upload and where we want to upload it
    const storageRef = ref(
      storage,
      `users/${userId}/educational-handout/${subject} Handout${Date.now()}.pdf`
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
      topic: 'Ancient Egypt (Daily life, culture, work, etc)',
      gradeLevel: 'Year 6 World History',
    },
    {
      topic: 'Introduction to the periodic table',
      gradeLevel: 'Chemistry',
    },
    {
      topic: 'Practicing gratitude and kindness',
      gradeLevel: '5th grade',
    },
    {
      topic: 'Introduction to computer programming',
      gradeLevel: 'online programming course',
    },
    {
      topic: 'How ecosystems work',
      gradeLevel: '9th grade biology',
    },
    {
      topic: 'Daily life in Ancient Rome',
      gradeLevel: 'Year 6 World History',
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
          boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.2)',
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
                <h4 className="pageTitle">Educational Handout ⚡</h4>
                {/* <Model /> */}
              </div>
              <FormRow
                type="text"
                labelText="Handout should cover:"
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
                {isLoading ? (
                  <RiseLoader color={'white'} loading={isLoading} size={7} />
                ) : (
                  'Generate Educational Handout'
                )}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5 className="subHeadline">
              Save time and quickly draft structured educational handouts for
              any subject matter or lesson plan.
            </h5>
            <p>
              ✔️ The more detailed you are, the better your results will be.
            </p>
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
            <a href="creations/educational-handouts" target="_blank">
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

export default EducationalHandout;
