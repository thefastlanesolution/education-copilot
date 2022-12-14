import { decode } from 'html-entities';

// Powerpoint Imports
import PPTXGenJS from 'pptxgenjs';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from '@firebase/auth';

// API Request Function to get the completion text and create the powerpoint
export async function fetchPowerpoint(
  subject,
  gradeLevel,
  setIsLoading,
  setCompletion,
  setPowerpointHasChanged,
  setHeaderText,
  setBodyText,
  setHeaderText2,
  setBodyText2,
  setHeaderText3,
  setBodyText3,
  setHeaderText4,
  setBodyText4,
  setHeaderText5,
  setBodyText5,
  setHeaderText6,
  setBodyText6,
  setHeaderText7,
  setBodyText7,
  setHeaderText8,
  setBodyText8,
  setHeaderText9,
  setBodyText9,
  setHeaderText10,
  setBodyText10,
  setHeaderText11,
  setBodyText11,
  setHeaderText12,
  setBodyText12,
  setHeaderText13,
  setBodyText13,
  setHeaderText14,
  setBodyText14,
  setHeaderText15,
  setBodyText15
) {
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
      var regex = /<header1>(.*?)<header1>/s;
      var match = regex.exec(textResult);
      console.log(match);
      var header1 = match[1];
      setHeaderText(header1);

      // Body 1
      var regex = /<body1>(.*?)<body1>/s;
      var match = regex.exec(textResult);
      console.log(match);
      var body1 = match[1];
      setBodyText(body1);

      // Header 2
      var regex = /<header2>(.*?)<header2>/s;
      var match = regex.exec(textResult);
      console.log(match);
      var header2 = match[1];
      setHeaderText2(header2);

      // Body 2
      var regex = /<body2>(.*?)<body2>/s;
      var match = regex.exec(textResult);
      console.log(match);
      var body2 = match[1];
      setBodyText2(body2);

      // Header 3
      var regex = /<header3>(.*?)<header3>/s;
      var match = regex.exec(textResult);
      console.log(match);
      setHeaderText3(match[1]);

      // Body 3
      var regex = /<body3>(.*?)<body3>/s;
      var match = regex.exec(textResult);
      console.log(match);
      setBodyText3(match[1]);

      // Header 4
      var regex = /<header4>(.*?)<header4>/s;
      var match = regex.exec(textResult);
      console.log(match);
      setHeaderText4(match[1]);

      // Body 4
      var regex = /<body4>(.*?)<body4>/s;
      var match = regex.exec(textResult);
      console.log(match);
      setBodyText4(match[1]);

      // Header 5
      var regex = /<header5>(.*?)<header5>/s;
      var match = regex.exec(textResult);
      console.log(match);
      setHeaderText5(match[1]);

      // Body 5
      var regex = /<body5>(.*?)<body5>/s;
      var match = regex.exec(textResult);
      console.log(match);
      setBodyText5(match[1]);

      // Header 6
      var regex = /<header6>(.*?)<header6>/s;
      var match = regex.exec(textResult);
      setHeaderText6(match[1]);

      // Body 6
      var regex = /<body6>(.*?)<body6>/s;
      var match = regex.exec(textResult);
      setBodyText6(match[1]);

      // Header 7
      var regex = /<header7>(.*?)<header7>/s;
      var match = regex.exec(textResult);
      setHeaderText7(match[1]);

      // Body 7
      var regex = /<body7>(.*?)<body7>/s;
      var match = regex.exec(textResult);
      setBodyText7(match[1]);

      // Header 8
      var regex = /<header8>(.*?)<header8>/s;
      var match = regex.exec(textResult);
      setHeaderText8(match[1]);

      // Body 8
      var regex = /<body8>(.*?)<body8>/s;
      var match = regex.exec(textResult);
      setBodyText8(match[1]);

      // Header 9
      var regex = /<header9>(.*?)<header9>/s;
      var match = regex.exec(textResult);
      setHeaderText9(match[1]);

      // Body 9
      var regex = /<body9>(.*?)<body9>/s;
      var match = regex.exec(textResult);
      setBodyText9(match[1]);

      // Header 10
      var regex = /<header10>(.*?)<header10>/s;
      var match = regex.exec(textResult);
      setHeaderText10(match[1]);

      // Body 10
      var regex = /<body10>(.*?)<body10>/s;
      var match = regex.exec(textResult);
      setBodyText10(match[1]);

      // Header 11
      var regex = /<header11>(.*?)<header11>/s;
      var match = regex.exec(textResult);
      setHeaderText11(match[1]);

      // Body 11
      var regex = /<body11>(.*?)<body11>/s;
      var match = regex.exec(textResult);
      setBodyText11(match[1]);

      // Header 12
      var regex = /<header12>(.*?)<header12>/s;
      var match = regex.exec(textResult);
      setHeaderText12(match[1]);

      // Body 12
      var regex = /<body12>(.*?)<body12>/s;
      var match = regex.exec(textResult);
      setBodyText12(match[1]);

      // Header 13
      var regex = /<header13>(.*?)<header13>/s;
      var match = regex.exec(textResult);
      setHeaderText13(match[1]);

      // Body 13
      var regex = /<body13>(.*?)<body13>/s;
      var match = regex.exec(textResult);
      setBodyText13(match[1]);

      // Header 14
      var regex = /<header14>(.*?)<header14>/s;
      var match = regex.exec(textResult);
      setHeaderText14(match[1]);

      // Body 14
      var regex = /<body14>(.*?)<body14>/s;
      var match = regex.exec(textResult);
      setBodyText14(match[1]);

      // Header 15
      if (textResult.includes('<header15>')) {
        var regex = /<header15>(.*?)<header15>/s;
        var match = regex.exec(textResult);
        setHeaderText15(match[1]);
      }

      // If there is a body 15, set the body text 15
      if (textResult.includes('<body15>')) {
        var regex = /<body15>(.*?)<body15>/s;
        var match = regex.exec(textResult);
        setBodyText15(match[1]);
      }

      const dataToSave = {
        subject,
        gradeLevel,
        application: 'powerpoint',
        generatedText: result.choices[0].text,
      };

      setPowerpointHasChanged(true);

      // wait 100 ms before setting the documentHasChanged state to false
      setTimeout(() => {
        setPowerpointHasChanged(false);
      }, 100);
    })
    .catch(error => console.log('error', error));
}

// Outside of the fetchApi function, we will now create the generatePowerpoint

export async function generatePowerpoint(
  subject,
  gradeLevel,
  headerText,
  bodyText,
  headerText2,
  bodyText2,
  headerText3,
  bodyText3,
  headerText4,
  bodyText4,
  headerText5,
  bodyText5,
  headerText6,
  bodyText6,
  headerText7,
  bodyText7,
  headerText8,
  bodyText8,
  headerText9,
  bodyText9,
  headerText10,
  bodyText10,
  headerText11,
  bodyText11,
  headerText12,
  bodyText12,
  headerText13,
  bodyText13,
  headerText14,
  bodyText14,
  headerText15,
  bodyText15
) {
  let pptx = new PPTXGenJS();

  console.log(subject);

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

  // Create slide 15 Header if headerText15 is not empty
  if (headerText15 !== '') {
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
  }

  const title = subject;

  console.log('title ===', title);

  pptx.writeFile({ fileName: `${title} Powerpoint` }).then(fileName => {
    console.log(`created file: ${fileName}`);
  });

  // Get the current user and the storage service and the user id
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;

  // Get the current user and the storage service and the user id
  const storage = getStorage();

  // Creates a reference to the file we want to upload and where we want to upload it
  const storageRef = ref(
    storage,
    `users/${userId}/powerpoints/${subject} Powerpoint.pptx`
  );

  const recipeRef = ref(
    storage,
    `users/${userId}/recipes/${subject} Recipe/${subject} Powerpoint.pptx`
  );

  console.log(storageRef);

  await pptx.write('blob').then(data => {
    const blobData = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    });

    uploadBytes(recipeRef, blobData);
    uploadBytes(storageRef, blobData);
  });
}
