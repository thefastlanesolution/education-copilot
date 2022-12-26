// Hooks and React Imports
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { decode } from 'html-entities';

// Design Imports
import Wrapper from '../../../assets/wrappers/WorkshopTools';
import { ImMagicWand, ImArrowLeft2 } from 'react-icons/im';
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

  //Gets the Title of the unit
  function truncateOverview(str) {
    const overview = str?.split(':')[1];
    return overview?.split('-')[0];
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
              ? truncate(unitDetails.day1.matchFirst, 350)
              : i === 2
              ? truncate(unitDetails.day2.matchSecond, 350)
              : i === 3
              ? truncate(unitDetails.day3.matchThird, 350)
              : i === 4
              ? truncate(unitDetails.day4.matchFourth, 350)
              : i === 5
              ? truncate(unitDetails.day5.matchFifth, 350)
              : i === 6
              ? truncate(unitDetails.day6.matchSixth, 350)
              : i === 7
              ? truncate(unitDetails.day7.matchSeventh, 350)
              : i === 8
              ? truncate(unitDetails.day8.matchEighth, 350)
              : i === 9
              ? truncate(unitDetails.day9.matchNinth, 350)
              : i === 10
              ? truncate(unitDetails.day10.matchTenth, 350)
              : i === 11
              ? truncate(unitDetails.day11.matchEleventh, 350)
              : i === 12
              ? truncate(unitDetails.day12.matchTwelfth, 350)
              : i === 13
              ? truncate(unitDetails.day13.matchThirteenth, 350)
              : i === 14
              ? truncate(unitDetails.day14.matchFourteenth, 350)
              : i === 15
              ? truncate(unitDetails.day15.matchFifteenth, 350)
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
        {<ImArrowLeft2 className="historyicon" />}Workshop
      </Link>
      <div className="pageheader">
        <div>{<ImMagicWand className="historyicon" />} Unit Planner</div>
      </div>
      <Wrapper>
        <div>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box sx={{ width: 400 }} p={2} role="presentation">
              <Typography variant="h4">Unit Details</Typography>
              <Typography variant="h6">Unit Name: {unitName}</Typography>
              <Typography variant="h6">Unit Length: {unitLength}</Typography>
              <Typography variant="h6">Time: {time}</Typography>
              <Typography variant="h6">Grade Level: {gradeLevel}</Typography>
            </Box>
          </Drawer>
        </div>
        <button
          style={{ width: '200px', marginBottom: '1.5rem' }}
          className="btn btn-block"
          onClick={() => setIsDrawerOpen(true)}
        >
          Unit Overview
        </button>
        <div>
          <strong>Unit Name</strong> {unitDetails.unitName}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <strong>Unit Length</strong> {unitDetails.unitLength} days
        </div>
        <div className="jobs">{dayCards}</div>
      </Wrapper>
    </div>
  );
};

export default UnitPreview;
