import { decode } from 'html-entities';

export async function fetchEducational(
  subject,
  gradeLevel,
  setIsLoading,
  setCompletion,
  setTitle,
  setCovers,
  setHeader1,
  setBody1,
  setHeader2,
  setBody2,
  setHeader3,
  setBody3,
  setHeader4,
  setBody4,
  setHeader5,
  setBody5,
  setHeader6,
  setBody6,
  setHeader7,
  setBody7,
  setHeader8,
  setBody8,
  setEducationalHasChanged
) {
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
    `${window.location.origin}/api/v1/completions/educationalHandoutCompletion`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      setIsLoading(false);
      console.log('Educational Handout ===', result);
      let textResult = decode(result.choices[0].text);
      setCompletion({
        generatedText: textResult,
      });

      console.log('Text Result ===', textResult);

      //set the title to everything between <title> and </title>
      var regex = /<title>(.*?)<\/title>/s;
      var matchFirst = textResult.match(regex);
      setTitle(matchFirst[1]);

      // Set Covers
      var regex = /<handoutcovers>(.*?)<\/handoutcovers>/s;
      var matchFirstExample = textResult.match(regex);
      setCovers(matchFirstExample[1]);

      // Set First Header
      var regex = /<header1>(.*?)<\/header1>/s;
      var matchFirstHeader = textResult.match(regex);
      setHeader1(matchFirstHeader[1]);

      // Set Body1
      var regex = /<body1>(.*?)<\/body1>/s;
      var matchFirstBody = textResult.match(regex);
      setBody1(matchFirstBody[1]);

      // Set Header2
      var regex = /<header2>(.*?)<\/header2>/s;
      var matchSecondHeader = textResult.match(regex);
      setHeader2(matchSecondHeader[1]);

      // Set Body2
      var regex = /<body2>(.*?)<\/body2>/s;
      var matchSecondBody = textResult.match(regex);
      setBody2(matchSecondBody[1]);

      // Set Header3
      var regex = /<header3>(.*?)<\/header3>/s;
      var matchThirdHeader = textResult.match(regex);
      setHeader3(matchThirdHeader[1]);

      // Set Body3
      var regex = /<body3>(.*?)<\/body3>/s;
      var matchThirdBody = textResult.match(regex);
      setBody3(matchThirdBody[1]);

      // Set Header4
      var regex = /<header4>(.*?)<\/header4>/s;
      var matchFourthHeader = textResult.match(regex);
      setHeader4(matchFourthHeader[1]);

      // Set Body4
      var regex = /<body4>(.*?)<\/body4>/s;
      var matchFourthBody = textResult.match(regex);
      setBody4(matchFourthBody[1]);

      // Set Header5
      var regex = /<header5>(.*?)<\/header5>/s;
      var matchFifthHeader = textResult.match(regex);
      if (matchFifthHeader) {
        setHeader5(matchFifthHeader[1]);
      }

      // Set Body5 Conditionally if it exists, it might not
      var regex = /<body5>(.*?)<\/body5>/s;
      var matchFifthBody = textResult.match(regex);
      if (matchFifthBody) {
        setBody5(matchFifthBody[1]);
      }

      // Set Header 6 Conditionally if it exists, it might not
      var regex = /<header6>(.*?)<\/header6>/s;
      var matchSixthHeader = textResult.match(regex);
      if (matchSixthHeader) {
        setHeader6(matchSixthHeader[1]);
      }

      // Set Body 6 Conditionally if it exists, it might not
      var regex = /<body6>(.*?)<\/body6>/s;
      var matchSixthBody = textResult.match(regex);
      if (matchSixthBody) {
        setBody6(matchSixthBody[1]);
      }

      // Set Header 7 Conditionally if it exists, it might not
      var regex = /<header7>(.*?)<\/header7>/s;
      var matchSeventhHeader = textResult.match(regex);
      if (matchSeventhHeader) {
        setHeader7(matchSeventhHeader[1]);
      }

      // Set Body 7 Conditionally if it exists, it might not
      var regex = /<body7>(.*?)<\/body7>/s;
      var matchSeventhBody = textResult.match(regex);
      if (matchSeventhBody) {
        setBody7(matchSeventhBody[1]);
      }

      // Set Header 8 Conditionally if it exists, it might not
      var regex = /<header8>(.*?)<\/header8>/s;
      var matchEighthHeader = textResult.match(regex);
      if (matchEighthHeader) {
        setHeader8(matchEighthHeader[1]);
      }

      // Set Body 8 Conditionally if it exists, it might not
      var regex = /<body8>(.*?)<\/body8>/s;
      var matchEighthBody = textResult.match(regex);
      if (matchEighthBody) {
        setBody8(matchEighthBody[1]);
      }

      setEducationalHasChanged(true);

      // wait 100 ms before setting the documentHasChanged state to false
      setTimeout(() => {
        setEducationalHasChanged(false);
      }, 100);

      const dataToSave = {
        subject,
        gradeLevel,
        application: 'Educational Handout V2',
        generatedText: result.choices[0].text,
      };
    })
    .catch(error => console.log('error', error));
}
