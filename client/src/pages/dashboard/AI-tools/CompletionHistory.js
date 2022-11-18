import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../../firebase.config';

const CompletionHistory = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [text, setText] = useState('');
  const [completionsForUser, setCompletionsForUser] = useState([]);

  async function getFromDBForUser(collectionName) {
    const auth = getAuth();
    const user = auth.currentUser;
    const docsToAdd = [];
    const dbQuery = query(
      collection(db, collectionName),
      where('userId', '==', user.uid)
    );
    const querySnapshot = await getDocs(dbQuery);
    querySnapshot.forEach(doc => {
      docsToAdd.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setCompletionsForUser(docsToAdd);
  }

  React.useEffect(() => getFromDBForUser('completions'), []);

  function handleClickAndDisplayCompletion(event, id) {
    const completionFound = completionsForUser.find(
      completion => completion.id === id
    );
    if (completionFound) {
      console.log(completionFound);
      setCompletion(completionFound.generatedText);
    }
  }

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
          <div className="form-center">
            <h4>Completion History 📝</h4>
          </div>

          <div className="bodyText" style={{ overflowY: 'scroll' }}>
            <h5>Here is your completion history</h5>
            {completionsForUser.map((doc, index) => (
              <p
                key={index}
                onClick={e => handleClickAndDisplayCompletion(e, doc.id)}
                style={{ cursor: 'pointer' }}
              >
                ✅ Grade Level: {doc.gradeLevel}
                <br />✅ Subject: {doc.subject}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="editor">
        <CKEditor
          editor={Editor}
          data={completion}
          onchange={(event, editor) => {
            const data = editor.setData('hello world');
            setText(data);
          }}
        ></CKEditor>
      </div>
    </Wrapper>
  );
};

export default CompletionHistory;
