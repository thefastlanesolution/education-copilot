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
import VideoList from '../pages/dashboard/AI-tools/VideoList';
import { decode } from 'html-entities';

// Acordian imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Tool = ({ title, lastName, overview, day, dayNumber, unitDetails }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [overview1, setOverview] = useState(overview);

  // Gets the overview of the unit and splits each line based on the '-'

  const overviewState = overview;

  // Create a handleClick function that will set a state value to true
  const handleClick = () => {
    setEditable(true);
  };

  const handleChange = e => {
    setOverview(e.target.value);
  };

  const handleBlur = () => {
    setEditable(false);
  };

  const textareaRef = useRef(null);

  // if editable is true, then the textarea will be editable
  useEffect(() => {
    if (editable) {
      textareaRef.current.focus();
    }
  }, [editable]);

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
                <AccordionDetails
                  onBlur={handleBlur}
                  className="lessonoverview-details"
                >
                  {editable ? (
                    <textarea
                      ref={textareaRef}
                      type="text"
                      value={overview1.replace(/<br\s*\/?>/gi, '')}
                      onChange={handleChange}
                      className="lessonoverview-textarea"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      // onClick={handleClick}
                      style={{ marginBottom: '1rem', padding: '1rem' }}
                      dangerouslySetInnerHTML={{
                        __html: overview1.replace(
                          /<br\s*\n?>/gi,
                          '<p style="margin-top: 0.5rem; margin-bottom: 0.5em;">'
                        ),
                      }}
                    />
                  )}
                </AccordionDetails>
              </Accordion>
              <Accordion>
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
              <Accordion>
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
                  __html: overview.replace(
                    /\n/g,
                    '<p style="margin-top: 0.5em; margin-bottom: 0.5em;">'
                  ),
                }}
              ></Typography>
            </div>
            <div className="actionButtons" style={{ marginTop: '1rem' }}>
              <button
                className="btn btn-block drawerbtn"
                onClick={() => setIsDrawerOpen(true)}
              >
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
