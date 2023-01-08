// React Imports
import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { decode } from 'html-entities';

// CSS & Design Imports
import './multiform.css';
import FormRow from '../../../components/FormRow';
import {
  IoArrowDown,
  IoArrowForward,
  IoTimerOutline,
  IoTimerSharp,
  IoBulbSharp,
} from 'react-icons/io5';
import UnitPlannerButton from '../UnitPlanner/API/UnitPlannerAPI';
import UnitIdeaButton from '../UnitPlanner/API/UnitPlannerAPI';
import RingLoader from 'react-spinners/RingLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Unit Planner Component

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [unitName, setUnitName] = useState('');
  const [subject, setSubject] = useState('');
  const [unitDetails, setUnitDetails] = useState('');
  const [unitStandards, setUnitStandards] = useState('');
  const [unitLength, setUnitLength] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [detailsHaveChanged, setDetailsHaveChanged] = useState(false);
  const [standardsHaveChanged, setStandardsHaveChanged] = useState(false);
  const [buttonJSX, setButtonJSX] = useState(null);

  //////////////////////////////////////
  //
  //
  //    UNIT DETAILS
  //
  //
  //////////////////////////////////////

  async function fetchUnitDetails(subject, unitName) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
      unitName,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/unitIdeaCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('unitIdeaCompletion ===', result);
        let textResult = result.choices[0].text;

        setDetailsHaveChanged(true);

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setDetailsHaveChanged(false);
        }, 100);

        let lines = result.choices[0].text.split('\n');
        setUnitDetails(textResult);
      })
      .catch(error => console.log('error', error));
  }

  //////////////////////////////////////
  //
  //
  //    UNIT STANDARDS
  //
  //
  //////////////////////////////////////

  async function fetchUnitStandards(subject, unitName, unitDetails) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
      unitName,
      unitDetails,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/unitObjectivesCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('unitObjectivesCompletion ===', result);
        let textResult = result.choices[0].text;

        setStandardsHaveChanged(true);

        // wait 100 ms before setting the documentHasChanged state to false
        setTimeout(() => {
          setStandardsHaveChanged(false);
        }, 100);

        let lines = result.choices[0].text.split('\n');
        setUnitStandards(textResult);
      })
      .catch(error => console.log('error', error));
  }

  const handleDetailsGeneration = event => {
    event.preventDefault();
    if (!subject || !unitName) {
      return;
    }
    fetchUnitDetails(subject, unitName);
  };

  const handleStandardGeneration = event => {
    event.preventDefault();
    if (!subject || !unitName || !unitDetails) {
      return;
    }
    fetchUnitStandards(subject, unitName, unitDetails);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  const navigate = useNavigate();

  const notify = () =>
    toast('🦄 Unit plan on the way!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  switch (currentStep) {
    case 1:
      return (
        <div className="container">
          <div className="headertext">Welcome to Copilot's Unit Planner 📅</div>
          <div className="header-subtext">
            Follow the simple steps below to create a new unit.
          </div>
          <IoArrowDown className="arrow" />
          <div className="form">
            <form onSubmit={handleSubmit}>
              <button
                className="btn btn-block"
                type="button"
                onClick={() => setCurrentStep(2)}
                style={{
                  height: '2.8rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                  <div>Let's get Started</div>
                  <IoArrowForward className="button-icon" />
                </div>
              </button>
            </form>
          </div>
          <div
            className="dividing-line"
            style={{
              width: '70%',
              height: '2px',
              backgroundColor: '#E5E5E5',
              margin: '0 0 2rem 0',
            }}
          ></div>

          <div>
            <button
              className="btn btn-block history-btn"
              type="button"
              onClick={() => navigate('/unit-history')}
              style={{
                height: '2.5rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'none',
                border: '2px solid #E5E5E5',
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
                <IoTimerOutline className="button-icon" />
                <div className="history-text">Unit History</div>
              </div>
            </button>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="container">
          <div className="headertext">First, let's give our unit a name...</div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <FormRow
                type="text"
                labelText="Unit Name:"
                name="unitName"
                value={unitName}
                handleChange={e => setUnitName(e.target.value)}
                placeHolder={'Ancient Egypt Unit'}
                style={{ marginBottom: '.33rem' }}
              />
              <FormRow
                type="text"
                labelText="Subject or Course:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
                placeHolder={'History / Social Studies'}
              />

              <div className="buttons">
                <button
                  className="btn btn-block back"
                  type="button"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>
                <button
                  className="btn btn-block"
                  type="submit"
                  // disabled={isLoading}
                  disabled={isLoading || unitName === '' || subject === ''}
                  onClick={() => setCurrentStep(3)}
                >
                  {isLoading ? 'Please Wait...' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="container">
          <div
            className="headertext"
            style={{
              marginTop: '5%',
            }}
          >
            Now, let's provide some details for the AI to use...
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="label-row">
                <label className="form-label">This unit should cover:</label>
                <button
                  disabled={isLoading}
                  className="ai-generate"
                  style={{
                    backgroundColor: 'white',
                    border: '2px solid #a665ff',
                  }}
                  onClick={handleDetailsGeneration}
                >
                  {!isLoading && (
                    <>
                      <IoBulbSharp
                        style={{ color: '#a665ff', fontSize: '1rem' }}
                      />
                    </>
                  )}
                  {isLoading && (
                    <RingLoader
                      color={'#7d5ff5'}
                      loading={isLoading}
                      size={20}
                    />
                  )}
                </button>
              </div>
              <textarea
                className="unit-textarea"
                placeholder="- Geographical advantages &#13;&#10;- Daily life and economics &#13;&#10;- Ancient Egyptian religion &#13;&#10;- etc"
                value={unitDetails}
                onChange={e => setUnitDetails(e.target.value)}
              />
              <div className="label-row" style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Standards / Objectives:</label>
                {unitDetails !== '' && (
                  <button
                    disabled={isLoading}
                    className="ai-generate"
                    style={{
                      backgroundColor: 'white',
                      border: '2px solid #a665ff',
                    }}
                    onClick={handleStandardGeneration}
                  >
                    {!isLoading && (
                      <>
                        <IoBulbSharp
                          style={{ color: '#a665ff', fontSize: '1rem' }}
                        />
                      </>
                    )}
                    {isLoading && (
                      <RingLoader
                        color={'#7d5ff5'}
                        loading={isLoading}
                        size={20}
                      />
                    )}
                  </button>
                )}
              </div>
              <textarea
                className="unit-textarea"
                placeholder="1. Locate and describe the major river systems and discuss the physical settings that supported permanent settlement and early civilizations.&#13;&#10; ‎ &#13;&#10;2. Discuss the main features of Egyptian art and architecture. &#13;&#10; ‎ &#13;&#10;3. Understand the relationship between religion and the social and political order in Mesopotamia and Egypt. &#13;&#10; ‎ &#13;&#10;4. Know the significance of Hammurabi's code. &#13;&#10; ‎ &#13;&#10;5. Describe the role of Egyptian trade in the eastern Mediterranean and Nile valley. &#13;&#10; ‎ &#13;&#10;6. Understand the significance of Queen Hatshepsut and Ramses the Great. &#13;&#10; ‎ &#13;&#10; 7. Identify the location of the Kush civilization and describe its political, commercial, and cultural relations with Egypt. &#13;&#10; ‎ &#13;&#10;8. Trace the evolution of language and its written forms"
                value={unitStandards}
                onChange={e => setUnitStandards(e.target.value)}
              />
            </form>
            <div className="buttons">
              <button
                className="btn btn-block back"
                type="button"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </button>
              <button
                className="btn btn-block"
                type="submit"
                // disabled={isLoading}
                disabled={isLoading || unitDetails === ''}
                onClick={() => setCurrentStep(4)}
              >
                {isLoading ? 'Please Wait...' : 'Final Step'}
              </button>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="container">
          <div className="headertext" style={{ maxWidth: '90%' }}>
            How many lessons should this unit include?
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="unit-length">
                <label
                  className="form-label counter-label"
                  style={{ color: '#050a30' }}
                >
                  Unit Length:
                </label>
                <div className="button-counter">
                  <button
                    className="button-left"
                    type="button"
                    disabled={unitLength <= 1}
                    onClick={() => setUnitLength(unitLength - 1)}
                  >
                    -
                  </button>
                  <FormRow
                    type="text"
                    className="length-input"
                    disabled="true"
                    value={
                      unitLength + (unitLength === 1 ? ' lesson' : ' lessons')
                    }
                    handleChange={e => setUnitLength(e.target.value)}
                    placeHolder={'1'}
                    style={{
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      color: '#050a30',
                      fontFamily: 'inter',
                      fontWeight: '700',
                    }}
                  />
                  <button
                    type="button"
                    className="button-right"
                    disabled={unitLength >= 15}
                    onClick={() => setUnitLength(unitLength + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </form>
            <div className="buttons">
              <button
                className="btn btn-block back"
                type="button"
                disabled={isLoading}
                onClick={() => setCurrentStep(3)}
              >
                Back
              </button>
              <UnitPlannerButton
                className="btn btn-block create"
                unitName={unitName}
                unitLength={unitLength}
                unitDetails={unitDetails}
                unitStandards={unitStandards}
                subject={subject}
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default MultiStepForm;
