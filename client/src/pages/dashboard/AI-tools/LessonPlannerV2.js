import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { db } from '../../../firebase.config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import MyReactPDF from './LessonPlanPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ImDownload } from 'react-icons/im';

const LessonPlannerV2 = () => {
  const { displayAlert } = useAppContext();

  // PDF File States

  const [aimSection, setAimSection] = useState('');
  const [objectivesSection, setObjectivesSection] = useState('');
  const [materialsSection, setMaterialsSection] = useState('');
  const [anticipatorySection, setAnticipatorySection] = useState('');
  const [modeledSection, setModeledSection] = useState('');
  const [guidedSection, setGuidedSection] = useState('');
  const [independentPractice, setIndependentPractice] = useState('');
  const [struggleSection, setStruggleSection] = useState('');
  const [closureSection, setClosureSection] = useState('');

  // API Request & Response States

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // add the documentHasChanged state hook
  const [documentHasChanged, setDocumentHasChanged] = useState(false);

  const debouncedTextChangeHandler = useCallback(
    debounce(handleEditorTextOnChange, 300),
    [completion]
  );

  async function fetchApi(subject, gradeLevel) {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      subject,
      gradeLevel,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${window.location.origin}/api/v1/completions/lessonPlannerV2Completion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('lessonPlannerV2Completion ===', result);
        let textResult = decode(result.choices[0].text);
        setCompletion({
          generatedText: textResult,
        });

        // Aim
        var regex = /<aim>(.*?)<aim>/;
        var matchAim = textResult.match(regex);
        console.log('Aim Match ====', matchAim[1]);
        setAimSection(matchAim[1]);

        // Objectives
        var regex = /<objectives>(.*?)<objectives>/;
        var matchObjectives = textResult.match(regex);
        console.log('Objectives Match ====', matchObjectives[1]);
        setObjectivesSection(matchObjectives[1]);

        // Materials Needed
        var regex = /<materials>(.*?)<materials>/;
        var matchMaterials = textResult.match(regex);
        console.log('Aim Match ====', matchMaterials[1]);
        setMaterialsSection(matchMaterials[1]);

        // Anticipatory Set
        var regex = /<anticipatory>(.*?)<anticipatory>/;
        var matchAnticipatory = textResult.match(regex);
        console.log('Objectives Match ====', matchAnticipatory[1]);
        setAnticipatorySection(matchAnticipatory[1]);

        // Modeled Practice
        var regex = /<modeled>(.*?)<modeled>/;
        var matchModeled = textResult.match(regex);
        console.log('Aim Match ====', matchModeled[1]);
        setModeledSection(matchModeled[1]);

        // Guided Practice
        var regex = /<guided>(.*?)<guided>/;
        var matchGuided = textResult.match(regex);
        console.log('Objectives Match ====', matchGuided[1]);
        setGuidedSection(matchGuided[1]);

        // Independent Practice
        var regex = /<independent>(.*?)<independent>/;
        var matchIndependent = textResult.match(regex);
        console.log('Aim Match ====', matchIndependent[1]);
        setIndependentPractice(matchIndependent[1]);

        // Struggle
        var regex = /<struggles>(.*?)<struggles>/;
        var matchStruggle = textResult.match(regex);
        console.log('Objectives Match ====', matchStruggle[1]);
        setStruggleSection(matchStruggle[1]);

        // Closure
        var regex = /<closure>(.*?)<closure>/;
        var matchClosure = textResult.match(regex);
        console.log('Aim Match ====', matchClosure[1]);
        setClosureSection(matchClosure[1]);

        setDocumentHasChanged(true);
      })
      .catch(error => console.log('error', error));
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      displayAlert();
      return;
    }
    fetchApi(subject, gradeLevel);
  };

  async function handleEditorTextOnChange(event, editor) {
    if (!completion.id) return console.log('No completion selected');
    const data = editor.getData();
    console.log('Saving data ...');
    const docRef = doc(db, 'completions', completion.id);
    await updateDoc(docRef, {
      generatedText: data,
    });
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
          <form onSubmit={handleSubmit}>
            <div className="form-center">
              <div className="titleAndVideo">
                <h4>Lesson Planner Version 2 ⚡</h4>
                {/* <Model /> */}
              </div>
              <FormRow
                type="text"
                labelText="Topic or lesson to generate lesson for:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Grade Level:"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Lesson Plan'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="downloadInfo">
        {<ImDownload className="downloadicon" />}
        Your lesson plan will be available for download once it is complete! 🚀
        <div className="pdfDownloadBtn">
          {documentHasChanged ? (
            <PDFDownloadLink
              className="btn btn-block pdfDownloadLink"
              document={
                <MyReactPDF
                  aimSection={aimSection}
                  objectivesSection={objectivesSection}
                  materialsSection={materialsSection}
                  anticipatorySection={anticipatorySection}
                  modeledSection={modeledSection}
                  guidedSection={guidedSection}
                  independentPractice={independentPractice}
                  struggleSection={struggleSection}
                  closureSection={closureSection}
                />
              }
              fileName="test.pdf"
            >
              {isLoading ? 'Please Wait...' : 'Download PDF'}
              {documentHasChanged ? '' : ''}
            </PDFDownloadLink>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
};

export default LessonPlannerV2;
