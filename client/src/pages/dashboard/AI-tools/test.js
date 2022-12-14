// React State Management Imports
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';

// CSS & Design Component Imports
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import Wrapper from '../../../assets/wrappers/InputForm';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { ImDownload } from 'react-icons/im';

// PDF Imports
import {
  PDFViewer,
  ReactPDF,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';

// Firebase Imports
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../firebase.config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

///////////////////////////
//
// PDF Template Here
//
///////////////////////////

const PDF = props => {
  const {
    subject,
    terms,
    firstDefinition,
    firstExample,
    firstExample2,
    firstWord,
  } = props;

  const styles = StyleSheet.create({
    wrapper: {
      borderColor: '#a665ff',
      borderWidth: 3,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 20,
    },
    headerFont: {
      fontFamily: 'Oswald',
      fontSize: 15,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      textAlign: 'left',
    },
    body: {
      paddingTop: 10,
      paddingBottom: 65,
      paddingHorizontal: 35,
      borderColor: '#a665ff',
      borderWidth: 2,
    },
    title: {
      fontSize: 24,
      paddingTop: 15,
      textAlign: 'left',
      fontFamily: 'Oswald',
    },
    aim: {
      paddingTop: 15,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 12,
      textAlign: 'left',
      marginBottom: 20,
    },
    goal: {
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 12,
      textAlign: 'left',
      marginBottom: 20,
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Context for: {subject}</Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Vocabulary Terms</Text>
          <Text style={styles.aim}>
            {'\n'}
            {'\n'}
            {firstWord}
            {'\n'}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{firstWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {firstDefinition}
            {'\n'}
            {'\n'}
            {firstExample}
            {'\n'}
            {'\n'}
            {firstExample2}
          </Text>
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

///////////////////////////
//
// COMPONENT STARTS HERE
//
///////////////////////////

const ContextBuider = () => {
  // PDF File States
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Vocabulary Handout States
  const [terms, setTerms] = useState('');
  const [firstWord, setFirstWord] = useState('');
  const [firstDefinition, setFirstDefinition] = useState('');
  const [firstExample, setFirstExample] = useState('');
  const [firstExample2, setFirstExample2] = useState('');

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
        var regex = /<firstDefinition>(.*?)<firstDefinition>/s;
        var matchFirst = textResult.match(regex);
        console.log('Aim Match ====', matchFirst[1]);
        setFirstDefinition(matchFirst[1]);

        // First Example
        var regex = /<firstExample>(.*?)<firstExample>/s;
        var matchFirstExample = textResult.match(regex);
        console.log('Aim Match ====', matchFirstExample[1]);
        setFirstExample(matchFirstExample[1]);

        // First Example 2
        var regex = /<firstExample2>(.*?)<firstExample2>/s;
        var matchFirstExample2 = textResult.match(regex);
        console.log('Aim Match ====', matchFirstExample2[1]);
        setFirstExample2(matchFirstExample2[1]);

        // First Word
        var regex = /<firstWord>(.*?)<firstWord>/s;
        var matchWord = textResult.match(regex);
        console.log('Aim Match ====', matchWord[1]);
        setFirstWord(matchWord[1]);

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
    fetchApi(subject, gradeLevel);
  };

  const handleDownload = async () => {
    const blob = await pdf(<PDF />).toBlob();

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

    uploadBytes(storageRef, blob);
  };

  // React Hooks
  useEffect(() => {
    if (documentHasChanged) {
      handleDownload();
    }
  }, [documentHasChanged]);

  return (
    <Wrapper>
      <Card
        sx={{
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '5px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
        className="input-card"
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="form-center">
              <div className="titleAndVideo">
                <h4>Context Builder ⚡</h4>
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
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Context Builder'}
              </button>
            </div>
          </form>
          <div className="downloadInfo">
            Your Context Builder will automatically download once it is
            complete! 🚀
            <button onClick={handleDownload}>Download PDF</button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <PDFDownloadLink
          document={
            <PDF
              subject={subject}
              firstWord={firstWord}
              firstDefinition={firstDefinition}
              firstExample={firstExample}
              firstExample2={firstExample2}
            />
          }
          fileName="test.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      </Card>
    </Wrapper>
  );
};

export default ContextBuider;
