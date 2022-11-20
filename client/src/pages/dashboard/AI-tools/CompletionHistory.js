import * as React from 'react';
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ImProfile, ImHistory } from 'react-icons/im';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../../firebase.config';
import { MultiSelect } from './MultiSelect';
import './CompletionHistory.css';

const CompletionHistory = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState({});
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [text, setText] = useState('');
  const [completionsForUser, setCompletionsForUser] = useState([]);
  const debouncedTextChangeHandler = useCallback(
    debounce(handleEditorTextOnChange, 300),
    [completion]
  );

  async function getFilteredDataFromDBForUser(collectionName, filter) {
    const auth = getAuth();
    const user = auth.currentUser;
    const docsToAdd = [];
    let dbQuery;
    if (filter === 'All Tools') {
      dbQuery = query(
        collection(db, collectionName),
        where('userId', '==', user.uid)
      );
    } else if (Array.isArray(filter)) {
      dbQuery = query(
        collection(db, collectionName),
        where('userId', '==', user.uid),
        where('application', 'in', filter)
      );
    }

    const querySnapshot = await getDocs(dbQuery);
    querySnapshot.forEach(doc => {
      docsToAdd.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    docsToAdd.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    setCompletionsForUser(docsToAdd);
  }

  React.useEffect(
    () => getFilteredDataFromDBForUser('completions', 'All Tools'),
    []
  );

  function handleClickAndDisplayCompletion(event, id) {
    const completionFound = completionsForUser.find(
      completion => completion.id === id
    );
    if (completionFound) {
      setCompletion(completionFound);
    }
  }

  async function handleEditorTextOnChange(event, editor) {
    if (!completion.id) return console.log('No completion selected');

    const data = editor.getData();
    console.log('Saving data ...');
    const docRef = doc(db, 'completions', completion.id);
    await updateDoc(docRef, {
      generatedText: data,
    });
  }

  // Shorten Output text in the output history card
  function truncateText(text) {
    const words = text.split(' ');
    const truncatedWords = words.slice(0, 14);
    return truncatedWords.join(' ') + ' ...';
  }

  // Strips the output of HTML formatting
  function stripHTMLTags(str) {
    return str.replace(/<[^>]*>/g, ' ');
  }

  return (
    <React.Fragment>
      <div className="pageheader">
        {<ImHistory className="historyicon" />} Completion History
      </div>
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
            <MultiSelect filterHandler={getFilteredDataFromDBForUser} />
            <div className="bodyText">
              {completionsForUser.map((doc, index) => (
                <p
                  className="completion"
                  key={index}
                  onClick={e => handleClickAndDisplayCompletion(e, doc.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="tool">
                    <strong>Tool:</strong> {doc.application}
                  </div>
                  <strong>Topic: </strong>
                  {doc.subject}
                  {doc.gradeLevel && (
                    <React.Fragment>
                      <br />
                      <strong>Grade Level: </strong>
                      {doc.gradeLevel}
                    </React.Fragment>
                  )}
                  <br />
                  <strong>Output: </strong>
                  {truncateText(stripHTMLTags(doc.generatedText))}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="editor">
          <CKEditor
            editor={Editor}
            data={completion.generatedText}
            onChange={debouncedTextChangeHandler}
          ></CKEditor>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default CompletionHistory;
