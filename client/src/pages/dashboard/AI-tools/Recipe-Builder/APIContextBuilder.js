import { decode } from 'html-entities';

export async function fetchApi(
  subject,
  gradeLevel,
  setIsLoading,
  setCompletion,
  setFirstDefinition,
  setFirstExample,
  setFirstWord,
  setDocumentHasChanged
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
    `${window.location.origin}/api/v1/completions/vocabCompletion`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      setIsLoading(false);
      console.log('Context Builder ===', result);
      let textResult = decode(result.choices[0].text);
      setCompletion({
        generatedText: textResult,
      });

      // First Definition
      var regex = /<definition1>(.*?)<definition1>/s;
      var matchFirst = textResult.match(regex);
      // console.log('Aim Match ====', matchFirst[1]);
      setFirstDefinition(matchFirst[1]);

      // First Example
      var regex = /<example1>(.*?)<example1>/s;
      var matchFirstExample = textResult.match(regex);
      // console.log('Aim Match ====', matchFirstExample[1]);
      setFirstExample(matchFirstExample[1]);

      // First Word
      var regex = /<word1>(.*?)<word1>/s;
      var matchWord = textResult.match(regex);
      // console.log('Aim Match ====', matchWord[1]);
      setFirstWord(matchWord[1]);

      setDocumentHasChanged(true);

      // wait 100 ms before setting the documentHasChanged state to false
      setTimeout(() => {
        setDocumentHasChanged(false);
      }, 100);

      const dataToSave = {
        subject,
        gradeLevel,
        application: 'Context Builder',
        generatedText: result.choices[0].text,
      };

      // Save the completion to the database, then set the completion state, then log the ref, then catch any errors
    })
    .catch(error => console.log('error', error));
}
