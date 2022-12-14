import { decode } from 'html-entities';

export async function fetchWritingPrompt(
  subject,
  setIsLoading,
  setCompletion,
  setPromptTitle,
  setPromptBody,
  setPromptQuestions,
  setWritingPromptHasChanged
) {
  setIsLoading(true);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    subject,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    `${window.location.origin}/api/v1/completions/writingPromptCompletion`,
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

      // Set Body
      var regex = /<title>(.*?)<\/title>/s;
      var matchFirst = textResult.match(regex);
      setPromptTitle(matchFirst[1]);

      // Set Body
      var regex = /<body>(.*?)<\/body>/s;
      var matchFirstExample = textResult.match(regex);
      setPromptBody(matchFirstExample[1]);

      // Set Questions
      var regex = /<questions>(.*?)<\/questions>/s;
      var matchFirstHeader = textResult.match(regex);
      setPromptQuestions(matchFirstHeader[1]);

      setWritingPromptHasChanged(true);

      // wait 100 ms before setting the documentHasChanged state to false
      setTimeout(() => {
        setWritingPromptHasChanged(false);
      }, 100);

      const dataToSave = {
        subject,
        application: 'Writing Prompt',
        generatedText: result.choices[0].text,
      };
    })
    .catch(error => console.log('error', error));
}
