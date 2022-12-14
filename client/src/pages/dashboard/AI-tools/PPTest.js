/* eslint-disable */

// React State Management Imports
import * as React from 'react';
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

//CSS & Design Component Imports
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import Wrapper from '../../../assets/wrappers/InputForm';
import { decode } from 'html-entities';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';
import { ImDownload } from 'react-icons/im';

// Powerpoint Imports
import PPTXGenJS from 'pptxgenjs';

// Firebase Imports
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../firebase.config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

/* eslint-enable */

const SlideGenerator = () => {
  // Powerpoint State
  const [name, setName] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [headerText2, setHeaderText2] = useState('');
  const [bodyText2, setBodyText2] = useState('');
  const [headerText3, setHeaderText3] = useState('');
  const [bodyText3, setBodyText3] = useState('');
  const [headerText4, setHeaderText4] = useState('');
  const [bodyText4, setBodyText4] = useState('');
  const [headerText5, setHeaderText5] = useState('');
  const [bodyText5, setBodyText5] = useState('');
  const [headerText6, setHeaderText6] = useState('');
  const [bodyText6, setBodyText6] = useState('');
  const [headerText7, setHeaderText7] = useState('');
  const [bodyText7, setBodyText7] = useState('');
  const [headerText8, setHeaderText8] = useState('');
  const [bodyText8, setBodyText8] = useState('');
  const [headerText9, setHeaderText9] = useState('');
  const [bodyText9, setBodyText9] = useState('');
  const [headerText10, setHeaderText10] = useState('');
  const [bodyText10, setBodyText10] = useState('');
  const [headerText11, setHeaderText11] = useState('');
  const [bodyText11, setBodyText11] = useState('');
  const [headerText12, setHeaderText12] = useState('');
  const [bodyText12, setBodyText12] = useState('');
  const [headerText13, setHeaderText13] = useState('');
  const [bodyText13, setBodyText13] = useState('');
  const [headerText14, setHeaderText14] = useState('');
  const [bodyText14, setBodyText14] = useState('');
  const [headerText15, setHeaderText15] = useState('');
  const [bodyText15, setBodyText15] = useState('');

  // API Request & Response State
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completion, setCompletion] = useState({
    generatedText: '',
  });

  // Async function to save the document to the database
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

  // API Request Function to get the completion text and create the powerpoint
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

    // Fetch the completion text from the API
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
        var header1 = match[1];
        setHeaderText(header1);

        // Body 1
        var regex = /<body1>(.*?)<body1>/g;
        var match = regex.exec(textResult);
        setBodyText(match[1]);

        // Header 2
        var regex = /<header2>(.*?)<header2>/g;
        var match = regex.exec(textResult);
        setHeaderText2(match[1]);

        // Body 2
        var regex = /<body2>(.*?)<body2>/g;
        var match = regex.exec(textResult);
        setBodyText2(match[1]);

        // Header 3
        var regex = /<header3>(.*?)<header3>/g;
        var match = regex.exec(textResult);
        setHeaderText3(match[1]);

        // Body 3
        var regex = /<body3>(.*?)<body3>/g;
        var match = regex.exec(textResult);
        setBodyText3(match[1]);

        // Header 4
        var regex = /<header4>(.*?)<header4>/g;
        var match = regex.exec(textResult);
        setHeaderText4(match[1]);

        // Body 4
        var regex = /<body4>(.*?)<body4>/g;
        var match = regex.exec(textResult);
        setBodyText4(match[1]);

        // Header 5
        var regex = /<header5>(.*?)<header5>/g;
        var match = regex.exec(textResult);
        setHeaderText5(match[1]);

        // Body 5
        var regex = /<body5>(.*?)<body5>/g;
        var match = regex.exec(textResult);
        setBodyText5(match[1]);

        // Header 6
        var regex = /<header6>(.*?)<header6>/g;
        var match = regex.exec(textResult);
        setHeaderText6(match[1]);

        // Body 6
        var regex = /<body6>(.*?)<body6>/g;
        var match = regex.exec(textResult);
        setBodyText6(match[1]);

        // Header 7
        var regex = /<header7>(.*?)<header7>/g;
        var match = regex.exec(textResult);
        setHeaderText7(match[1]);

        // Body 7
        var regex = /<body7>(.*?)<body7>/g;
        var match = regex.exec(textResult);
        setBodyText7(match[1]);

        // Header 8
        var regex = /<header8>(.*?)<header8>/g;
        var match = regex.exec(textResult);
        setHeaderText8(match[1]);

        // Body 8
        var regex = /<body8>(.*?)<body8>/g;
        var match = regex.exec(textResult);
        setBodyText8(match[1]);

        // Header 9
        var regex = /<header9>(.*?)<header9>/g;
        var match = regex.exec(textResult);
        setHeaderText9(match[1]);

        // Body 9
        var regex = /<body9>(.*?)<body9>/g;
        var match = regex.exec(textResult);
        setBodyText9(match[1]);

        // Header 10
        var regex = /<header10>(.*?)<header10>/g;
        var match = regex.exec(textResult);
        setHeaderText10(match[1]);

        // Body 10
        var regex = /<body10>(.*?)<body10>/g;
        var match = regex.exec(textResult);
        setBodyText10(match[1]);

        // Header 11
        var regex = /<header11>(.*?)<header11>/g;
        var match = regex.exec(textResult);
        setHeaderText11(match[1]);

        // Body 11
        var regex = /<body11>(.*?)<body11>/g;
        var match = regex.exec(textResult);
        setBodyText11(match[1]);

        // Header 12
        var regex = /<header12>(.*?)<header12>/g;
        var match = regex.exec(textResult);
        setHeaderText12(match[1]);

        // Body 12
        var regex = /<body12>(.*?)<body12>/g;
        var match = regex.exec(textResult);
        setBodyText12(match[1]);

        // Header 13
        var regex = /<header13>(.*?)<header13>/g;
        var match = regex.exec(textResult);
        setHeaderText13(match[1]);

        // Body 13
        var regex = /<body13>(.*?)<body13>/g;
        var match = regex.exec(textResult);
        setBodyText13(match[1]);

        // Header 14
        var regex = /<header14>(.*?)<header14>/g;
        var match = regex.exec(textResult);
        setHeaderText14(match[1]);

        // Body 14
        var regex = /<body14>(.*?)<body14>/g;
        var match = regex.exec(textResult);
        setBodyText14(match[1]);

        // Header 15
        var regex = /<header15>(.*?)<header15>/g;
        var match = regex.exec(textResult);
        setHeaderText15(match[1]);

        // Body 15
        var regex = /<body15>(.*?)<body15>/g;
        var match = regex.exec(textResult);
        setBodyText15(match[1]);

        console.log('headerText ===', headerText);

        const dataToSave = {
          subject,
          gradeLevel,
          application: 'powerpoint',
          generatedText: result.choices[0].text,
        };

        //POWER POINT CODE

        // Get the current user and the storage service and the user id
        const auth = getAuth();
        const user = auth.currentUser;
        const storage = getStorage();
        const userId = user.uid;

        // Create a storage reference from our storage service
        const storageRef = ref(
          storage,
          `users/${userId}/powerpoints/${subject}${Date.now()}.pptx`
        );

        // Runs Generate Powerpoint function
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

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      console.log('No subject selected');
      return;
    }
    fetchApi(subject, gradeLevel);
  };

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

      <div className="downloadInfo">
        {<ImDownload className="downloadicon" />}
        Your slideshow will automatically download once it is complete!
      </div>
    </Wrapper>
  );
};

export default SlideGenerator;