import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import './Tool.css';

// Acordian imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const Tool = ({ overview }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [overview1, setOverview] = useState(overview);

  // Gets the overview of the unit and splits each line based on the '-'
  const splitOverview = overview => {
    let split = overview.split('-');
    return split.map(item => {
      if (split.indexOf(item) > 0) {
        return <div>- {item}</div>;
      }
    });
  };

  // Create a handleClick function that will set a state value to true
  const handleClick = () => {
    setEditable(true);
  };

  const handleChange = e => {
    setOverview(e.target.value);
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.addEventListener('blur', () => {
        setEditable(false);
      });
    }
  }, []);

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
          <div className="day-card">
            <div className="day-details">
              <Accordion defaultExpanded={true}>
                <AccordionSummary>
                  <Typography>Lesson Overview</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {editable ? (
                    <textarea
                      ref={textareaRef}
                      type="text"
                      value={overview1}
                      onChange={handleChange}
                      style={{ height: '200px', width: '300px' }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      onClick={handleClick}
                      style={{ marginBottom: '1rem' }}
                    >
                      {splitOverview(overview)}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default Tool;
