import PPTXGenJS from 'pptxgenjs';

export const PPTTemplate = (
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
) => {
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
};
