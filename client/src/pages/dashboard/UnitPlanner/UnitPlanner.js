// Hooks and React Imports
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { decode } from 'html-entities';

// Design Imports
import FormRow from '../../../components/FormRow';
import Wrapper from '../../../assets/wrappers/WorkshopTools';
import { ImHistory } from 'react-icons/im';
import '../dashboard-pages/creationPages/Creations.css';

// Firebase Imports
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../../firebase.config';

const UnitPlanner = () => {
  // States
  const [completionsForUser, setCompletionsForUser] = useState([]);
  const [time, setTime] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [completion, setCompletion] = useState({
    unitName: '',
    unitLength: '',
    time: '',
    gradeLevel: '',
    id: '',
  });

  const navigate = useNavigate();

  // Get current user
  const auth = getAuth();
  const user = auth.currentUser;

  const completionRef = useRef(null);
  completionRef.current = completion;

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

  React.useEffect(() => getFilteredDataFromDBForUser('units', 'All Tools'), []);

  // eslint-disable
  return (
    <div className="creations">
      <div className="pageheader">
        <div>{<ImHistory className="historyicon" />} Unit History</div>
      </div>
      <Wrapper>
        <div className="unitpage">
          <div className="unithistory">
            <div className="bodyText">
              {completionsForUser.map((doc, index) => (
                <p
                  className="completion"
                  key={index}
                  onClick={() => navigate(`/unit-planner/${doc.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <strong>Unit Topic: </strong>
                    {doc.unitName}
                  </div>
                  <div>
                    <strong>Unit Length:</strong> {doc.unitLength} days
                  </div>
                </p>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default UnitPlanner;
