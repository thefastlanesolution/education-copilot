// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { fetchApi } from './APIContextBuilder';
import { fetchLessonPlan } from './APILessonPlanner';
import { fetchPowerpoint, generatePowerpoint } from './APIPowerpoint';
import { fetchEducational } from './APIEducational';
import { fetchWritingPrompt } from './APIWritingPrompt';

// CSS & Design Component Imports
import Card from '@mui/material/Card';
import FormRow from '../../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import Wrapper from '../../../../assets/wrappers/InputForm';
import FileCard from '../../../../components/FileCard';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../../AI-tools-css/ModalStyling.css';
import { ImDownload, ImArrowLeft2 } from 'react-icons/im';
import '../PDFCSS.css';
import './RecipeBuilder.css';

// PDF & Powerpoint Imports
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PDF from '../ContextPDF';
import EducationalPDF from '../EducationalPDF';
import WritingPDF from '../WritingPDF';
import LessonPDF from '../LessonPDF';
import { Document, Page } from 'react-pdf';
import PPTXGenJS from 'pptxgenjs';

// Firebase Imports
import { getAuth } from '@firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from 'firebase/storage';
import { db } from '../../../../firebase.config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

///////////////////////////
//
// COMPONENT STARTS HERE
//
///////////////////////////

const RecipeBuilder = () => {
  // PDF File States
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // URL States
  const [fileUrl, setFileUrl] = useState(null);
  const [lessonUrl, setLessonUrl] = useState(null);
  const [powerpointUrl, setPowerpointUrl2] = useState(null);
  const [educationUrl, setEducationUrl] = useState(null);
  const [writingUrl, setWritingUrl] = useState(null);

  // Powerpoint State
  const [pptBlob, setPPTBlob] = useState(null);
  const [name, setName] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [headerText2, setHeaderText2] = useState('');
  const [bodyText2, setBodyText2] = useState('');
  const [headerText3, setHeaderText3] = useState('');
  const [bodyText3, setBodyText3] = useState('');
  const [headerText4, setHeaderText4] = useState('');
  const [bodyText4, setBodyText4] = useState('');
  const [headerText5, setHeaderText5] = useState('');
  const [bodyText5, setBodyText5] = useState('');
  const [headerText6, setHeaderText6] = useState('');
  const [bodyText6, setBodyText6] = useState('');
  const [headerText7, setHeaderText7] = useState('');
  const [bodyText7, setBodyText7] = useState('');
  const [headerText8, setHeaderText8] = useState('');
  const [bodyText8, setBodyText8] = useState('');
  const [headerText9, setHeaderText9] = useState('');
  const [bodyText9, setBodyText9] = useState('');
  const [headerText10, setHeaderText10] = useState('');
  const [bodyText10, setBodyText10] = useState('');
  const [headerText11, setHeaderText11] = useState('');
  const [bodyText11, setBodyText11] = useState('');
  const [headerText12, setHeaderText12] = useState('');
  const [bodyText12, setBodyText12] = useState('');
  const [headerText13, setHeaderText13] = useState('');
  const [bodyText13, setBodyText13] = useState('');
  const [headerText14, setHeaderText14] = useState('');
  const [bodyText14, setBodyText14] = useState('');
  const [headerText15, setHeaderText15] = useState('');
  const [bodyText15, setBodyText15] = useState('');

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

  // Lesson Plan States
  const [aimSection, setAimSection] = useState('');
  const [objectivesSection, setObjectivesSection] = useState('');
  const [materialsSection, setMaterialsSection] = useState('');
  const [anticipatorySection, setAnticipatorySection] = useState('');
  const [modeledSection, setModeledSection] = useState('');
  const [guidedSection, setGuidedSection] = useState('');
  const [independentPractice, setIndependentPractice] = useState('');
  const [struggleSection, setStruggleSection] = useState('');
  const [closureSection, setClosureSection] = useState('');

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

  // Writing Prompt States
  const [promptTitle, setPromptTitle] = useState('');
  const [promptBody, setPromptBody] = useState('');
  const [promptQuestions, setPromptQuestions] = useState('');

  // API Request & Response States
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentHasChanged, setDocumentHasChanged] = useState(false);
  const [educationalHasChanged, setEducationalHasChanged] = useState(false);
  const [lessonHasChanged, setLessonHasChanged] = useState(false);
  const [powerpointHasChanged, setPowerpointHasChanged] = useState(false);
  const [writingPromptHasChanged, setWritingPromptHasChanged] = useState(false);
  const [creationCards, setCreationCards] = useState([]);

  // Get the current user and the storage service and the user id
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();
  const userId = user.uid;
  const userFolderRef = ref(
    storage,
    `users/${userId}/recipes/${subject} Recipe/`
  );

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

  const handleSubmit = async event => {
    event.preventDefault();
    // Check if the user has entered a subject
    if (!subject) {
      console.log('Please enter a subject');
      return;
    }
    // If the Lesson Plan checkbox is checked, make the API request
    if (checkbox1) {
      fetchLessonPlan(
        subject,
        gradeLevel,
        setIsLoading,
        setCompletion,
        setLessonHasChanged,
        setAimSection,
        setObjectivesSection,
        setMaterialsSection,
        setAnticipatorySection,
        setModeledSection,
        setGuidedSection,
        setIndependentPractice,
        setClosureSection,
        setStruggleSection
      );
    }

    // If the Powerpoint checkbox is checked, make the API request
    if (checkbox2) {
      fetchPowerpoint(
        subject,
        gradeLevel,
        setIsLoading,
        setCompletion,
        setPowerpointHasChanged,
        setHeaderText,
        setBodyText,
        setHeaderText2,
        setBodyText2,
        setHeaderText3,
        setBodyText3,
        setHeaderText4,
        setBodyText4,
        setHeaderText5,
        setBodyText5,
        setHeaderText6,
        setBodyText6,
        setHeaderText7,
        setBodyText7,
        setHeaderText8,
        setBodyText8,
        setHeaderText9,
        setBodyText9,
        setHeaderText10,
        setBodyText10,
        setHeaderText11,
        setBodyText11,
        setHeaderText12,
        setBodyText12,
        setHeaderText13,
        setBodyText13,
        setHeaderText14,
        setBodyText14,
        setHeaderText15,
        setBodyText15
      );
    }

    // If the Context checkbox is checked, make the API request
    if (checkbox3) {
      await fetchApi(
        subject,
        gradeLevel,
        setIsLoading,
        setCompletion,
        setFirstDefinition,
        setFirstExample,
        setFirstWord,
        setFirstExample2,
        setSecondDefinition,
        setSecondExample,
        setSecondWord,
        setSecondExample2,
        setThirdDefinition,
        setThirdExample,
        setThirdWord,
        setThirdExample2,
        setFourthDefinition,
        setFourthExample,
        setFourthWord,
        setFourthExample2,
        setFifthDefinition,
        setFifthExample,
        setFifthWord,
        setFifthExample2,
        setSixthDefinition,
        setSixthExample,
        setSixthWord,
        setSixthExample2,
        setSeventhDefinition,
        setSeventhExample,
        setSeventhWord,
        setSeventhExample2,
        setEighthDefinition,
        setEighthExample,
        setEighthWord,
        setEighthExample2,
        setNinthDefinition,
        setNinthExample,
        setNinthWord,
        setNinthExample2,
        setTenthDefinition,
        setTenthExample,
        setTenthWord,
        setTenthExample2,
        setDocumentHasChanged
      );
    }

    if (checkbox4) {
      fetchEducational(
        subject,
        gradeLevel,
        setIsLoading,
        setCompletion,
        setTitle,
        setCovers,
        setHeader1,
        setBody1,
        setHeader2,
        setBody2,
        setHeader3,
        setBody3,
        setHeader4,
        setBody4,
        setHeader5,
        setBody5,
        setHeader6,
        setBody6,
        setHeader7,
        setBody7,
        setHeader8,
        setBody8,
        setEducationalHasChanged
      );
    }

    if (checkbox5) {
      fetchWritingPrompt(
        subject,
        setIsLoading,
        setCompletion,
        setPromptTitle,
        setPromptBody,
        setPromptQuestions,
        setWritingPromptHasChanged
      );
    }
  };

  // Function to handle the download of the Context Builder PDF
  const handleDownload = async () => {
    const blob = await pdf(
      <PDF
        subject={subject}
        firstWord={firstWord}
        firstDefinition={firstDefinition}
        firstExample={firstExample}
        firstExample2={firstExample2}
        secondWord={secondWord}
        secondDefinition={secondDefinition}
        secondExample={secondExample}
        secondExample2={secondExample2}
        thirdWord={thirdWord}
        thirdDefinition={thirdDefinition}
        thirdExample={thirdExample}
        thirdExample2={thirdExample2}
        fourthWord={fourthWord}
        fourthDefinition={fourthDefinition}
        fourthExample={fourthExample}
        fourthExample2={fourthExample2}
        fifthWord={fifthWord}
        fifthDefinition={fifthDefinition}
        fifthExample={fifthExample}
        fifthExample2={fifthExample2}
        sixthWord={sixthWord}
        sixthDefinition={sixthDefinition}
        sixthExample={sixthExample}
        sixthExample2={sixthExample2}
        seventhWord={seventhWord}
        seventhDefinition={seventhDefinition}
        seventhExample={seventhExample}
        seventhExample2={seventhExample2}
        eighthWord={eighthWord}
        eighthDefinition={eighthDefinition}
        eighthExample={eighthExample}
        eighthExample2={eighthExample2}
        ninthWord={ninthWord}
        ninthDefinition={ninthDefinition}
        ninthExample={ninthExample}
        ninthExample2={ninthExample2}
        tenthWord={tenthWord}
        tenthDefinition={tenthDefinition}
        tenthExample={tenthExample}
        tenthExample2={tenthExample2}
      />
    ).toBlob();

    const storageRef = ref(
      storage,
      `users/${userId}/context-builder/${subject} Context Builder.pdf`
    );

    const recipeRef = ref(
      storage,
      `users/${userId}/recipes/${subject} Recipe/${subject} Context Builder.pdf`
    );

    await uploadBytes(storageRef, blob).then(snapshot => {
      console.log('Uploaded a Context Builder!', snapshot);
    });

    await uploadBytes(recipeRef, blob).then(snapshot => {
      console.log('Uploaded a Context Builder!', snapshot);
    });

    // Gets the download URL for the file
    const fileUrl = await getDownloadURL(storageRef);
    setFileUrl(fileUrl);
  };

  // Function to handle the download of the Lesson Plan PDF
  const handleLessonPlanDownload = async () => {
    // Lesson Plan Information
    const lessonBlob = await pdf(
      <LessonPDF
        subject={subject}
        aimSection={aimSection}
        objectivesSection={objectivesSection}
        materialsSection={materialsSection}
        anticipatorySection={anticipatorySection}
        modeledSection={modeledSection}
        guidedSection={guidedSection}
        independentPractice={independentPractice}
        closureSection={closureSection}
        struggleSection={struggleSection}
      />
    ).toBlob();

    // Lesson Plan Storage Reference
    const lessonRef = ref(
      storage,
      `users/${userId}/lesson-plans/${subject} Lesson Plan.pdf`
    );

    // Lesson Plan Recipe Reference
    const recipeRef = ref(
      storage,
      `users/${userId}/recipes/${subject} Recipe/${subject} Lesson Plan.pdf`
    );

    await uploadBytes(lessonRef, lessonBlob).then(snapshot => {
      console.log('Uploaded a Lesson Plan!', snapshot);
    });

    await uploadBytes(recipeRef, lessonBlob).then(snapshot => {
      console.log('Uploaded a Lesson Plan!', snapshot);
    });

    // Gets the download URL for the file
    const lessonUrl = await getDownloadURL(lessonRef);
    setLessonUrl(lessonUrl);
  };

  const handleEducationalDownload = async () => {
    // Educational Handout
    const lessonBlob = await pdf(
      <EducationalPDF
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

    // Educational Handout Storage Reference
    const educationRef = ref(
      storage,
      `users/${userId}/educational-handout/${subject} Educational Handout.pdf`
    );

    // Educational Handout Recipe Reference
    const recipeRef = ref(
      storage,
      `users/${userId}/recipes/${subject} Recipe/${subject} Educational Handout.pdf`
    );

    await uploadBytes(educationRef, lessonBlob).then(snapshot => {
      console.log('Uploaded an Education Handout!', snapshot);
    });

    await uploadBytes(recipeRef, lessonBlob).then(snapshot => {
      console.log('Uploaded an Education Handout!', snapshot);
    });

    // Gets the download URL for the file
    const educationUrl = await getDownloadURL(educationRef);
    setEducationUrl(educationUrl);
  };

  const handleWritingPromptDownload = async () => {
    // Educational Handout
    const writingBlob = await pdf(
      <WritingPDF
        promptTitle={promptTitle}
        promptBody={promptBody}
        promptQuestions={promptQuestions}
      />
    ).toBlob();

    // Writing Prompt Storage Reference
    const writingRef = ref(
      storage,
      `users/${userId}/writing-prompts/${subject} Writing Prompt.pdf`
    );

    // Writing Prompt Recipe Reference
    const recipeRef = ref(
      storage,
      `users/${userId}/recipes/${subject} Recipe/${subject} Writing Prompt.pdf`
    );

    await uploadBytes(writingRef, writingBlob).then(snapshot => {
      console.log('Uploaded an Writing Prompt!', snapshot);
    });

    await uploadBytes(recipeRef, writingBlob).then(snapshot => {
      console.log('Uploaded an Writing Prompt!', snapshot);
    });

    // Gets the download URL for the file
    const writingUrl = await getDownloadURL(writingRef);
    setWritingUrl(writingUrl);
  };

  // Function to handle the download of the Educational Powerpoint PPTX

  const handlePowerpointDownload = async () => {
    await generatePowerpoint(
      setPowerpointUrl2,
      subject,
      gradeLevel,
      headerText,
      bodyText,
      headerText2,
      bodyText2,
      headerText3,
      bodyText3,
      headerText4,
      bodyText4,
      headerText5,
      bodyText5,
      headerText6,
      bodyText6,
      headerText7,
      bodyText7,
      headerText8,
      bodyText8,
      headerText9,
      bodyText9,
      headerText10,
      bodyText10,
      headerText11,
      bodyText11,
      headerText12,
      bodyText12,
      headerText13,
      bodyText13,
      headerText14,
      bodyText14,
      headerText15,
      bodyText15,
      powerpointHasChanged,
      setPPTBlob,
      pptBlob,
      powerpointUrl
    );
    console.log('the generate PowerPoint Function is done');
  };

  // React Hooks

  // Context Builder handleDownload Trigger
  useEffect(() => {
    if (documentHasChanged) {
      handleDownload();
    }
  }, [documentHasChanged]);

  // Lesson Plan handleDownload Trigger
  useEffect(() => {
    if (lessonHasChanged) {
      handleLessonPlanDownload();
    }
  }, [lessonHasChanged]);

  // Powerpoint handleDownload Trigger
  useEffect(() => {
    if (powerpointHasChanged) {
      handlePowerpointDownload();
    }
  }, [powerpointHasChanged]);

  // Educational handleDownload Trigger
  useEffect(() => {
    if (educationalHasChanged) {
      handleEducationalDownload();
    }
  }, [educationalHasChanged]);

  useEffect(() => {
    if (writingPromptHasChanged) {
      handleWritingPromptDownload();
    }
  }, [writingPromptHasChanged]);

  // Anytime the fileUrl changes, it will update the state
  useEffect(() => {
    setFileUrl(fileUrl);
  }, [fileUrl]);

  let cardContent = 'hello world';

  // File Manager Render
  useEffect(() => {
    listAll(userFolderRef)
      .then(res => {
        res.items.forEach(itemRef => {});
        const creationCardsPromises = res.items.map(async itemRef => {
          const downloadURL = await getDownloadURL(itemRef);

          const name = itemRef.name;

          // If name is longer than 50 characters, run this function.

          function truncateText(name) {
            const words = name.split('');
            const truncatedWords = words.slice(0, 35);
            return truncatedWords.join('') + '...';
          }

          return (
            <>
              <div className="generatedfilecard">
                <a href={`${downloadURL}`} target="_blank">
                  <FileCard
                    key={itemRef.name}
                    type={name.includes('pptx') ? 'ppt' : 'pdf'}
                    toolName={name.length > 50 ? truncateText(name) : name}
                    // fileUrl={downloadURL}
                    lastName={
                      <Document file={downloadURL}>
                        <Page pageNumber={1} scale={0.3} />
                      </Document>
                    }
                  />
                </a>
              </div>
            </>
          );
        });
        Promise.all(creationCardsPromises).then(creationCards => {
          setCreationCards(creationCards);
          // setDataLoaded(true);
        });
      })
      .catch(error => {
        console.log("Couldn't get files");
      });
    // eslint-disable-next-line
  }, [lessonUrl, fileUrl, powerpointUrl, educationUrl, writingUrl]);

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
                <h4 className="pageTitle">Recipe Builder ⚡</h4>
                {/* <Model /> */}
              </div>
              <FormRow
                type="text"
                labelText="Topic or Lesson Area:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Class & Grade Level:"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
              />
              <div className="subHeader">
                Choose your resources to generate:
              </div>
              <div className="checkbox-group">
                <div className="check1">
                  <input
                    type="checkbox"
                    name="lessonplancheckbox"
                    id="lessonplancheckbox"
                    value={checkbox1}
                    onChange={e => setCheckbox1(e.target.checked)}
                  />
                  <label htmlFor="checkbox1">Lesson Plan</label>
                </div>
                <div className="check2">
                  <input
                    type="checkbox"
                    name="powerpointcheckbox"
                    id="powerpointcheckbox"
                    value={checkbox2}
                    onChange={e => setCheckbox2(e.target.checked)}
                  />
                  <label htmlFor="checkbox2">PowerPoint</label>
                </div>
                <div className="check3">
                  <input
                    type="checkbox"
                    name="contextbuildercheckbox"
                    id="contextbuildercheckbox"
                    value={checkbox3}
                    onChange={e => setCheckbox3(e.target.checked)}
                  />
                  <label htmlFor="checkbox3">Context Builder</label>
                </div>
                <div className="check4">
                  <input
                    type="checkbox"
                    name="educationalcheckbox"
                    id="educationalcheckbox"
                    value={checkbox4}
                    onChange={e => setCheckbox4(e.target.checked)}
                  />
                  <label htmlFor="checkbox4">Educational Handout</label>
                </div>
                {/* <div className="check5">
                  <input
                    type="checkbox"
                    name="writingpromptcheckbox"
                    id="writingpromptcheckbox"
                    value={checkbox4}
                    onChange={e => setCheckbox5(e.target.checked)}
                  />
                  <label htmlFor="checkbox4">Writing Prompt</label>
                </div> */}
              </div>
              <button
                className="btn btn-block generatebtn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Resources'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card
        className="listview"
        sx={{
          borderRadius: '0px',
        }}
      >
        <div className="labels">
          <div className="namelabel">File Name</div>
          <div className="actionslabel">Actions</div>
        </div>
        {creationCards}
      </Card>
    </Wrapper>
  );
};

export default RecipeBuilder;
