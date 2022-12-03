import * as React from 'react';
import { useState, useCallback } from 'react';
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
import Model from './videoModal';
import '../AI-tools-css/ModalStyling.css';
import PPTXGenJS from 'pptxgenjs';

const SlideGenerator = () => {
  const { displayAlert } = useAppContext();

  const [completion, setCompletion] = useState({
    generatedText: '',
  });
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedTextChangeHandler = useCallback(
    debounce(handleEditorTextOnChange, 300),
    [completion]
  );

  async function saveCompletionToDB(collectionName, data) {
    const auth = getAuth();
    const user = auth.currentUser;
    data = {
      ...data,
      userId: user.uid,
      timestamp: Date.now(),
    };
    const ref = await addDoc(collection(db, collectionName), data);
    return ref;
  }

  async function fetchApi(subject, gradeLevel) {
    console.log(
      'fetchApi has started, this is the first line of code rendered from this function'
    );

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
      `${window.location.origin}/api/v1/completions/powerPointCompletion`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        console.log('powerPointCompletion ===', result);
        let textResult = decode(result.choices[0].text);
        // textResult = nl2br(textResult);
        console.log('textResult ===', textResult);

        // Header 1
        var regex = /<header1>(.*?)<header1>/g;
        var match = regex.exec(textResult);
        var headerText = match[1];

        // Body 1
        var regex = /<body1>(.*?)<body1>/g;
        var match = regex.exec(textResult);
        var bodyText = match[1];

        // Header 2
        var regex = /<header2>(.*?)<header2>/g;
        var match = regex.exec(textResult);
        var headerText2 = match[1];

        // Body 2
        var regex = /<body2>(.*?)<body2>/g;
        var match = regex.exec(textResult);
        var bodyText2 = match[1];

        // Header 3
        var regex = /<header3>(.*?)<header3>/g;
        var match = regex.exec(textResult);
        var headerText3 = match[1];

        // Body 3
        var regex = /<body3>(.*?)<body3>/g;
        var match = regex.exec(textResult);
        var bodyText3 = match[1];

        // Header 4
        var regex = /<header4>(.*?)<header4>/g;
        var match = regex.exec(textResult);
        var headerText4 = match[1];

        // Body 4
        var regex = /<body4>(.*?)<body4>/g;
        var match = regex.exec(textResult);
        var bodyText4 = match[1];

        // Header 5
        var regex = /<header5>(.*?)<header5>/g;
        var match = regex.exec(textResult);
        var headerText5 = match[1];

        // Body 5
        var regex = /<body5>(.*?)<body5>/g;
        var match = regex.exec(textResult);
        var bodyText5 = match[1];

        // Header 6
        var regex = /<header6>(.*?)<header6>/g;
        var match = regex.exec(textResult);
        var headerText6 = match[1];

        // Body 6
        var regex = /<body6>(.*?)<body6>/g;
        var match = regex.exec(textResult);
        var bodyText6 = match[1];

        // Header 7
        var regex = /<header7>(.*?)<header7>/g;
        var match = regex.exec(textResult);
        var headerText7 = match[1];

        // Body 7
        var regex = /<body7>(.*?)<body7>/g;
        var match = regex.exec(textResult);
        var bodyText7 = match[1];

        // Header 8
        var regex = /<header8>(.*?)<header8>/g;
        var match = regex.exec(textResult);
        var headerText8 = match[1];

        // Body 8
        var regex = /<body8>(.*?)<body8>/g;
        var match = regex.exec(textResult);
        var bodyText8 = match[1];

        // Header 9
        var regex = /<header9>(.*?)<header9>/g;
        var match = regex.exec(textResult);
        var headerText9 = match[1];

        // Body 9
        var regex = /<body9>(.*?)<body9>/g;
        var match = regex.exec(textResult);
        var bodyText9 = match[1];

        // Header 10
        var regex = /<header10>(.*?)<header10>/g;
        var match = regex.exec(textResult);
        var headerText10 = match[1];

        // Body 10
        var regex = /<body10>(.*?)<body10>/g;
        var match = regex.exec(textResult);
        var bodyText10 = match[1];

        // Header 11
        var regex = /<header11>(.*?)<header11>/g;
        var match = regex.exec(textResult);
        var headerText11 = match[1];

        // Body 11
        var regex = /<body11>(.*?)<body11>/g;
        var match = regex.exec(textResult);
        var bodyText11 = match[1];

        // Header 12
        var regex = /<header12>(.*?)<header12>/g;
        var match = regex.exec(textResult);
        var headerText12 = match[1];

        // Body 12
        var regex = /<body12>(.*?)<body12>/g;
        var match = regex.exec(textResult);
        var bodyText12 = match[1];

        // Header 13
        var regex = /<header13>(.*?)<header13>/g;
        var match = regex.exec(textResult);
        var headerText13 = match[1];

        // Body 13
        var regex = /<body13>(.*?)<body13>/g;
        var match = regex.exec(textResult);
        var bodyText13 = match[1];

        // Header 14
        var regex = /<header14>(.*?)<header14>/g;
        var match = regex.exec(textResult);
        var headerText14 = match[1];

        // Body 14
        var regex = /<body14>(.*?)<body14>/g;
        var match = regex.exec(textResult);
        var bodyText14 = match[1];

        // Header 15
        var regex = /<header15>(.*?)<header15>/g;
        var match = regex.exec(textResult);
        var headerText15 = match[1];

        // Body 15
        var regex = /<body15>(.*?)<body15>/g;
        var match = regex.exec(textResult);
        var bodyText15 = match[1];

        console.log('headerText ===', headerText);

        const dataToSave = {
          subject,
          gradeLevel,
          application: 'Slide Generator',
          generatedText: result.choices[0].text,
        };

        //POWER POINT CODE

        const generatePowerpoint = () => {
          let pptx = new PPTXGenJS();

          // Create slide 1 Header
          let slide1 = pptx.addSlide();
          slide1.background = { color: '4285f4' };
          slide1.addText(`${headerText}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 1 Body
          slide1.addText(`${bodyText}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 2 Header
          let slide2 = pptx.addSlide();
          slide2.background = { color: '4285f4' };
          slide2.addText(`${headerText2}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 2 Body
          slide2.addText(`${bodyText2}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create Slide 3 Header
          let slide3 = pptx.addSlide();
          slide3.background = { color: '4285f4' };
          slide3.addText(`${headerText3}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 3 Body
          slide3.addText(`${bodyText3}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 4 Header
          let slide4 = pptx.addSlide();
          slide4.background = { color: '4285f4' };
          slide4.addText(`${headerText4}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 4 Body
          slide4.addText(`${bodyText4}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 5 Header
          let slide5 = pptx.addSlide();
          slide5.background = { color: '4285f4' };
          slide5.addText(`${headerText5}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 5 Body
          slide5.addText(`${bodyText5}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 6 Header
          let slide6 = pptx.addSlide();
          slide6.background = { color: '4285f4' };
          slide6.addText(`${headerText6}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 6 Body
          slide6.addText(`${bodyText6}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 7 Header
          let slide7 = pptx.addSlide();
          slide7.background = { color: '4285f4' };
          slide7.addText(`${headerText7}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 7 Body
          slide7.addText(`${bodyText7}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create Slide 8 Header
          let slide8 = pptx.addSlide();
          slide8.background = { color: '4285f4' };
          slide8.addText(`${headerText8}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 8 Body
          slide8.addText(`${bodyText8}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 9 Header
          let slide9 = pptx.addSlide();
          slide9.background = { color: '4285f4' };
          slide9.addText(`${headerText9}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 9 Body
          slide9.addText(`${bodyText9}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 10 Header
          let slide10 = pptx.addSlide();
          slide10.background = { color: '4285f4' };
          slide10.addText(`${headerText10}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 10 Body
          slide10.addText(`${bodyText10}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 11 Header
          let slide11 = pptx.addSlide();
          slide11.background = { color: '4285f4' };
          slide11.addText(`${headerText11}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 11 Body
          slide11.addText(`${bodyText11}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 12 Header
          let slide12 = pptx.addSlide();
          slide12.background = { color: '4285f4' };
          slide12.addText(`${headerText12}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 12 Body
          slide12.addText(`${bodyText12}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create Slide 13 Header
          let slide13 = pptx.addSlide();
          slide13.background = { color: '4285f4' };
          slide13.addText(`${headerText13}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 13 Body
          slide13.addText(`${bodyText13}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 14 Header
          let slide14 = pptx.addSlide();
          slide14.background = { color: '4285f4' };
          slide14.addText(`${headerText14}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 14 Body
          slide14.addText(`${bodyText14}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Create slide 15 Header
          let slide15 = pptx.addSlide();
          slide15.background = { color: '4285f4' };
          slide15.addText(`${headerText15}`, {
            w: 9,
            h: 1,
            x: 0.5,
            y: 0.25,
            fontSize: 40,
            color: 'FFFFFF',
          });

          // Create Slide 15 Body
          slide15.addText(`${bodyText15}`, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            color: 'FFFFFF',
            fontSize: 20,
            align: 'left',
          });

          // Generate the PowerPoint file
          pptx.writeFile({ fileName: `${name}` }).then(fileName => {
            console.log(`created file: ${fileName}`);
          });
        };

        generatePowerpoint();

        saveCompletionToDB('completions', dataToSave)
          .then(ref => {
            setCompletion({
              ...dataToSave,
              id: ref.id,
            });
            console.log('Saved succesfully, ref: ', ref);
          })
          .catch(err => console.log('error', err));
      })
      .catch(error => console.log('error', error));
  }

  // function nl2br(str, is_xhtml) {
  //   var breakTag =
  //     is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
  //   return (str + '').replace(
  //     /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
  //     '$1' + breakTag + '$2'
  //   );
  // }

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
                <h4>Slideshow Generator 📝</h4>
                <Model />
              </div>
              <FormRow
                type="text"
                labelText="Slideshow Name:"
                name="name"
                value={name}
                handleChange={e => setName(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Generate a Powerpoint for my lesson about:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="This Powerpoint should cover:"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Slideshow'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>
              Save time and quickly create educational slideshows for any
              subject matter.
            </h5>
            <p>
              <br />
              ✔️ The more specific you are, the better the results will be.
              <br />
              ✔️ Add a few details and Copilot will fill in the rest.
              <br />
              🔄 If you don't like the results, simply click 'Generate
              Slideshow' again.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="editor">
        <CKEditor
          editor={Editor}
          data={completion.generatedText}
          onChange={debouncedTextChangeHandler}
        ></CKEditor>
      </div>
    </Wrapper>
  );
};

export default SlideGenerator;
