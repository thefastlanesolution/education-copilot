import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Drawer, Box, Typography } from '@mui/material';
import './Tool.css';
import LessonPlanButton from '../pages/dashboard/UnitPlanner/API/LessonPlanAPI';
import StudentObjectivesButton from '../pages/dashboard/UnitPlanner/API/StudentObjectivesAPI';
import EssentialQuestionsButton from '../pages/dashboard/UnitPlanner/API/EssentialQuestionsAPI';
import EducationalHandoutButton from '../pages/dashboard/UnitPlanner/API/EducationalHandoutAPI';
import ContextBuilderButton from '../pages/dashboard/UnitPlanner/API/ContextBuilderAPI';
import LessonOverviewButton from '../pages/dashboard/UnitPlanner/API/RegenButtons/LessonOverviewButton';
import VideoList from '../pages/dashboard/AI-tools/VideoList';
import { IoEyeSharp, IoTimerOutline, IoRefreshSharp } from 'react-icons/io5';

// Acordian imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Firebase Imports
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../src/firebase.config';
import { connectStorageEmulator } from 'firebase/storage';

const Tool = ({
  title,
  lastName,
  overview,
  day,
  dayNumber,
  unitDetails,
  unitName,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [overview1, setOverview] = useState(overview);
  const [dayDetails, setDayDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completion, setCompletion] = useState('');
  const [lessonOverview, setLessonOverview] = useState('');

  const { unitID } = useParams();

  // Get the unit details from the database
  async function getDayDetails() {
    const auth = getAuth();
    const user = auth.currentUser;

    const unitRef = doc(db, 'units', unitID);
    const docSnap = await getDoc(unitRef);

    setDayDetails({
      unitName: docSnap.data().unitName,
      unitLength: Number(docSnap.data().unitLength),
      time: Number(docSnap.data().time),
      gradeLevel: docSnap.data().gradeLevel,
      unitStandards: docSnap.data().unitStandards,
      unitDetails: docSnap.data().unitDetails,
      day1: docSnap.data().day1,
      title1: docSnap.data().title1,
    });
  }

  const lessonOverviewText = overview.replace(/<br\s*\/?>/g, '');
  console.log('lessonOverviewText ===', lessonOverviewText);

  async function fetchLessonOverview(subject, gradeLevel, title, day) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
      gradeLevel,
      title,
      day,
      unitName,
      lessonOverviewText,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/lessonOverviewCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('lessonOverviewCompletion ===', result);
        let textResult = result.choices[0].text;
        setCompletion({
          generatedText: textResult,
        });

        setLessonOverview(textResult);
      });
  }

  const overviewState = overview;

  const handleLessonGeneration = async () => {
    await fetchLessonOverview(
      dayDetails.unitDetails,
      dayDetails.gradeLevel,
      overviewState,
      day
    );
  };

  useEffect(() => {
    if (lessonOverview) {
      saveObjectives(dayNumber);
    }
  }, [lessonOverview]);

  const saveObjectives = async dayNumber => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      async function updateDay(dayNumber) {
        const docRef = doc(db, 'units', unitID);
        const docSnap = await getDoc(docRef);
        const day = await docSnap.get(dayNumber);
        const updatedDay = {
          ...day,
          matchFirst: `${JSON.stringify(nl2br(lessonOverview))}`,
        };
        await updateDoc(docRef, { [dayNumber]: updatedDay });
      }

      await updateDay(dayNumber);
    } catch (error) {
      console.log(error);
    }
  };

  function nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === 'undefined' ? '<br/>' : '<br>';
    return (str + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      '$1' + breakTag + '$2'
    );
  }

  const textareaRef = useRef(null);

  return (
    <>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{ width: '72vw', height: '100%', background: '#f8fafc' }}
          p={2}
          role="presentation"
        >
          <div className="navcontrols">
            <button
              style={{
                marginLeft: '.7rem',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                border: 'none',
                background: '#a665ff',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              Close
            </button>
            {/* <div>next</div> */}
          </div>
          <div className="day-card">
            <div
              className="day-details"
              style={{
                border: '3px solid lightgrey',
                marginBottom: '1rem',
              }}
            >
              <Typography
                variant="h6"
                style={{
                  fontFamily: 'inter',
                  fontWeight: 700,
                  marginBottom: '1.2rem',
                }}
              >
                {day} - {title}
              </Typography>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: '#f0f4f8' }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'inter',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Lesson Overview
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="lessonoverview-details">
                  <LessonOverviewButton
                    overview={overviewState}
                    dayNumber={`day${dayNumber}`}
                    unitDetails={unitDetails}
                    unitName={unitName}
                    day={day}
                    title={title}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  style={{ backgroundColor: '#f0f4f8' }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'inter',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Student Objectives
                  </Typography>
                </AccordionSummary>
                <div className="studentobjectives-container">
                  <AccordionDetails>
                    <StudentObjectivesButton
                      overview={overviewState}
                      dayNumber={`day${dayNumber}`}
                      unitDetails={unitDetails}
                    />
                  </AccordionDetails>
                </div>
              </Accordion>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  style={{ backgroundColor: '#f0f4f8' }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'inter',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Essential Questions
                  </Typography>
                </AccordionSummary>
                <div className="studentobjectives-container">
                  <AccordionDetails>
                    <EssentialQuestionsButton
                      overview={overviewState}
                      dayNumber={`day${dayNumber}`}
                      unitDetails={unitDetails}
                    />
                  </AccordionDetails>
                </div>
              </Accordion>
              {/* <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  style={{ backgroundColor: '#f0f4f8' }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'inter',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Standards
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion> */}
            </div>
            <div
              className="day-resources"
              style={{
                border: '3px solid lightgrey',
                marginBottom: '1rem',
              }}
            >
              <Typography
                variant="h6"
                style={{ fontFamily: 'inter', fontWeight: 700 }}
              >
                Lesson Resources
              </Typography>
              <br />
              <LessonPlanButton
                overview={overviewState}
                dayNumber={`day${dayNumber}`}
                unitDetails={unitDetails}
              />
              <EducationalHandoutButton
                overview={overviewState}
                dayNumber={`day${dayNumber}`}
                unitDetails={unitDetails}
              />
              <ContextBuilderButton
                overview={overviewState}
                dayNumber={`day${dayNumber}`}
                unitDetails={unitDetails}
              />
              <div className="video-resources">
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: 'inter',
                    fontWeight: 700,
                    paddingBottom: '1.5rem',
                  }}
                >
                  AI Video Recommendations
                </Typography>
                <VideoList lessonTopic={title} />
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
      <Card
        sx={{
          width: '100%',
          maxWidth: '100%',
          border: '2px solid #cdc1fb',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            border: '2px solid #a665ff',
          },
        }}
      >
        <CardContent>
          <div className="dayCard">
            <div>
              <article>
                <div
                  className="emoji"
                  style={{
                    fontSize: '.9rem',
                    fontFamily: 'inter',
                    fontWeight: '600',
                  }}
                >
                  {' '}
                  <IoTimerOutline className="button-icon" />
                  {day}
                </div>
              </article>
              <Typography
                variant="h5"
                component="div"
                className="toolTitle"
                sx={{
                  fontSize: '1.1rem',
                  fontFamily: 'inter',
                  fontWeight: '600',
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: overview
                    .replace(
                      /\n/g,
                      '<p style="margin-top: 0.5em; margin-bottom: 0.5em;">'
                    )
                    .substring(0, 225),
                }}
              ></Typography>
            </div>
            <div className="actionButtons" style={{ marginTop: '1rem' }}>
              <button
                className="btn btn-block drawerbtn"
                onClick={() => setIsDrawerOpen(true)}
              >
                {' '}
                <IoEyeSharp className="button-icon" />
                View Resources
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Tool;
