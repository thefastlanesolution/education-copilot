// Hooks and React Imports
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { decode } from 'html-entities';

// Design Imports
import Wrapper from '../../../assets/wrappers/WorkshopTools';
import { ImMagicWand, ImArrowLeft2 } from 'react-icons/im';
import { IoCalendarSharp, IoEyeSharp, IoTimerOutline } from 'react-icons/io5';
import '../dashboard-pages/creationPages/Creations.css';
import Day from '../../../components/UnitDay';
import { Drawer, Box, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

// Firebase Imports
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../../firebase.config';

const UnitPreview = () => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [unitDetails, setUnitDetails] = useState({
    unitName: '',
    unitLength: '',
    time: '',
    gradeLevel: '',
  });
  const [dayCards, setDayCards] = useState([]);

  // Destructure unitDetails
  const { unitName, unitLength, time, gradeLevel } = unitDetails;
  const { unitID } = useParams();

  // Get the unit details from the database
  async function getUnitDetails() {
    const auth = getAuth();
    const user = auth.currentUser;

    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);

    setUnitDetails({
      unitName: docSnap.data().unitName,
      unitLength: Number(docSnap.data().unitLength),
      time: Number(docSnap.data().time),
      gradeLevel: docSnap.data().gradeLevel,
      unitStandards: docSnap.data().unitStandards,
      unitDetails: docSnap.data().unitDetails,
      day1: docSnap.data().day1,
      day2: docSnap.data().day2,
      day3: docSnap.data().day3,
      day4: docSnap.data().day4,
      day5: docSnap.data().day5,
      day6: docSnap.data().day6,
      day7: docSnap.data().day7,
      day8: docSnap.data().day8,
      day9: docSnap.data().day9,
      day10: docSnap.data().day10,
      day11: docSnap.data().day11,
      day12: docSnap.data().day12,
      day13: docSnap.data().day13,
      day14: docSnap.data().day14,
      day15: docSnap.data().day15,
      title1: docSnap.data().title1,
      title2: docSnap.data().title2,
      title3: docSnap.data().title3,
      title4: docSnap.data().title4,
      title5: docSnap.data().title5,
      title6: docSnap.data().title6,
      title7: docSnap.data().title7,
      title8: docSnap.data().title8,
      title9: docSnap.data().title9,
      title10: docSnap.data().title10,
      title11: docSnap.data().title11,
      title12: docSnap.data().title12,
      title13: docSnap.data().title13,
      title14: docSnap.data().title14,
      title15: docSnap.data().title15,
    });
  }

  // Split each line of the overview based on the '-'
  const splitOverview = overview => {
    let split = overview.split('-');
    return split.map(item => {
      if (split.indexOf(item) > 0) {
        return <div>- {item}</div>;
      }
    });
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  //create a function called truncateOverview that gets all the text after the first colon.
  function truncateOverview(str) {
    return str?.split(':')[1];
  }

  // Function to render a Day component for each number in the unit length
  function renderDays() {
    const days = [];
    for (let i = 1; i <= unitDetails.unitLength; i++) {
      days.push(
        <Day
          unitName={unitName}
          unitDetails={unitDetails}
          dayNumber={i}
          key={`Day ${i}`}
          day={`Day ${i}`}
          title={
            i === 1
              ? truncateOverview(unitDetails.title1)
              : i === 2
              ? truncateOverview(unitDetails.title2)
              : i === 3
              ? truncateOverview(unitDetails.title3)
              : i === 4
              ? truncateOverview(unitDetails.title4)
              : i === 5
              ? truncateOverview(unitDetails.title5)
              : i === 6
              ? truncateOverview(unitDetails.title6)
              : i === 7
              ? truncateOverview(unitDetails.title7)
              : i === 8
              ? truncateOverview(unitDetails.title8)
              : i === 9
              ? truncateOverview(unitDetails.title9)
              : i === 10
              ? truncateOverview(unitDetails.title10)
              : i === 11
              ? truncateOverview(unitDetails.title11)
              : i === 12
              ? truncateOverview(unitDetails.title12)
              : i === 13
              ? truncateOverview(unitDetails.title13)
              : i === 14
              ? truncateOverview(unitDetails.title14)
              : i === 15
              ? truncateOverview(unitDetails.title15)
              : ''
          }
          overview={
            i === 1
              ? unitDetails.day1.match
              : i === 2
              ? unitDetails.day2.match
              : i === 3
              ? unitDetails.day3.match
              : i === 4
              ? unitDetails.day4.match
              : i === 5
              ? unitDetails.day5.match
              : i === 6
              ? unitDetails.day6.match
              : i === 7
              ? unitDetails.day7.match
              : i === 8
              ? unitDetails.day8.match
              : i === 9
              ? unitDetails.day9.match
              : i === 10
              ? unitDetails.day10.match
              : i === 11
              ? unitDetails.day11.match
              : i === 12
              ? unitDetails.day12.match
              : i === 13
              ? unitDetails.day13.match
              : i === 14
              ? unitDetails.day14.match
              : i === 15
              ? unitDetails.day15.match
              : ''
          }
        />
      );
    }
    return days;
  }

  // React Hooks & Misc Functions
  useEffect(() => {
    getUnitDetails();
  }, []);

  useEffect(() => {
    setDayCards(renderDays());
  }, [unitDetails]);

  return (
    <div className="creations">
      <Link to={'../unit-planner'}>
        {<ImArrowLeft2 className="historyicon" />}Back to Unit Planner
      </Link>
      <div
        className="pageheader"
        style={{
          marginTop: '1rem',
        }}
      >
        <div>
          {
            <ImMagicWand
              className="historyicon"
              style={{ fontSize: '1.2rem' }}
            />
          }{' '}
          {unitName}
        </div>
      </div>
      <div
        style={{
          marginBottom: '1.3rem',
          fontFamily: 'inter',
          fontWeight: '500',
          fontSize: '1.2rem',
          transform: 'translateY(-.5rem)',
          color: '#000000',
        }}
      >
        {<IoCalendarSharp className="historyicon" />} {unitDetails.unitLength}{' '}
        days
      </div>
      <Wrapper>
        <div className="jobs">{dayCards}</div>
      </Wrapper>
    </div>
  );
};

export default UnitPreview;
