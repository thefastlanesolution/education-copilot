// Hooks and React Imports
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { decode } from 'html-entities';

// Design Imports
import Wrapper from '../../../assets/wrappers/WorkshopTools';
import { ImHistory } from 'react-icons/im';
import { IoCalendarSharp, IoEyeSharp, IoTimerOutline } from 'react-icons/io5';
import '../dashboard-pages/creationPages/Creations.css';
import './UnitHistory.css';

// Firebase Imports
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc,
  limit,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../../firebase.config';

const UnitPlanner = () => {
  // States
  const [completionsForUser, setCompletionsForUser] = useState([]);
  const [unitID, setUnitID] = useState('');
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
        <div>
          <button
            className="btn btn-block newunit-btn"
            type="button"
            onClick={() => navigate('/unit-planner')}
            style={{
              height: '2.5rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'none',
              border: '1px solid #E5E5E5',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <IoCalendarSharp className="button-icon" />
              <div className="history-text">New Unit</div>
            </div>
          </button>
        </div>
      </div>
      <Wrapper>
        <div className="unithistory">
          <div className="unithistory-cards">
            {completionsForUser.map((doc, index) => (
              <p
                className="unithistory-card"
                key={index}
                onClick={() => navigate(`/unit-planner/${doc.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="unithistory-length">
                  <IoTimerOutline className="unithistory-icon" />
                  {doc.unitLength} days
                </div>
                <div className="unithistory-name">{doc.unitName}</div>
                <button
                  className="btn btn-block newunit-btn"
                  type="button"
                  onClick={() => navigate('/unit-planner')}
                  style={{
                    height: '2rem',
                    width: '150px',
                    display: 'flex',
                    marginTop: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 'none',
                    border: '1px solid #E5E5E5',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <IoEyeSharp className="button-icon" />
                    <div className="history-text">View</div>
                  </div>
                </button>
              </p>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default UnitPlanner;
