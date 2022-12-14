import { decode } from 'html-entities';

export async function fetchApi(
  subject,
  gradeLevel,
  setIsLoading,
  setCompletion,
  setFirstDefinition,
  setFirstExample,
  setFirstWord,
  setFirstExample2,
  setSecondDefinition,
  setSecondExample,
  setSecondWord,
  setSecondExample2,
  setThirdDefinition,
  setThirdExample,
  setThirdWord,
  setThirdExample2,
  setFourthDefinition,
  setFourthExample,
  setFourthWord,
  setFourthExample2,
  setFifthDefinition,
  setFifthExample,
  setFifthWord,
  setFifthExample2,
  setSixthDefinition,
  setSixthExample,
  setSixthWord,
  setSixthExample2,
  setSeventhDefinition,
  setSeventhExample,
  setSeventhWord,
  setSeventhExample2,
  setEighthDefinition,
  setEighthExample,
  setEighthWord,
  setEighthExample2,
  setNinthDefinition,
  setNinthExample,
  setNinthWord,
  setNinthExample2,
  setTenthDefinition,
  setTenthExample,
  setTenthWord,
  setTenthExample2,
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
      console.log('Aim Match ====', matchFirst[1]);
      setFirstDefinition(matchFirst[1]);

      // First Example
      var regex = /<example1>(.*?)<example1>/s;
      var matchFirstExample = textResult.match(regex);
      console.log('Aim Match ====', matchFirstExample[1]);
      setFirstExample(matchFirstExample[1]);

      // Second definition
      var regex = /<definition2>(.*?)<definition2>/s;
      var matchSecond = textResult.match(regex);
      console.log('Aim Match ====', matchSecond[1]);
      setSecondDefinition(matchSecond[1]);

      // Second Example
      var regex = /<example2>(.*?)<example2>/s;
      var matchSecondExample = textResult.match(regex);
      console.log('Aim Match ====', matchSecondExample[1]);
      setSecondExample(matchSecondExample[1]);

      // Third Definition
      var regex = /<definition3>(.*?)<definition3>/s;
      var matchThird = textResult.match(regex);
      console.log('Aim Match ====', matchThird[1]);
      setThirdDefinition(matchThird[1]);

      // Third Example
      var regex = /<example3>(.*?)<example3>/s;
      var matchThirdExample = textResult.match(regex);
      console.log('Aim Match ====', matchThirdExample[1]);
      setThirdExample(matchThirdExample[1]);

      // Fourth Definition
      var regex = /<definition4>(.*?)<definition4>/s;
      var matchFourth = textResult.match(regex);
      console.log('Aim Match ====', matchFourth[1]);
      setFourthDefinition(matchFourth[1]);

      // Fourth Example
      var regex = /<example4>(.*?)<example4>/s;
      var matchFourthExample = textResult.match(regex);
      console.log('Aim Match ====', matchFourthExample[1]);
      setFourthExample(matchFourthExample[1]);

      // Fifth Definition
      var regex = /<definition5>(.*?)<definition5>/s;
      var matchFifth = textResult.match(regex);
      console.log('Aim Match ====', matchFifth[1]);
      setFifthDefinition(matchFifth[1]);

      // Fifth Example
      var regex = /<example5>(.*?)<example5>/s;
      var matchFifthExample = textResult.match(regex);
      console.log('Aim Match ====', matchFifthExample[1]);
      setFifthExample(matchFifthExample[1]);

      // Sixth Definition
      var regex = /<definition6>(.*?)<definition6>/s;
      var matchSixth = textResult.match(regex);
      console.log('Aim Match ====', matchSixth[1]);
      setSixthDefinition(matchSixth[1]);

      // Sixth Example
      var regex = /<example6>(.*?)<example6>/s;
      var matchSixthExample = textResult.match(regex);
      console.log('Aim Match ====', matchSixthExample[1]);
      setSixthExample(matchSixthExample[1]);

      // Seventh Definition
      var regex = /<definition7>(.*?)<definition7>/s;
      var matchSeventh = textResult.match(regex);
      console.log('Aim Match ====', matchSeventh[1]);
      setSeventhDefinition(matchSeventh[1]);

      // Seventh Example
      var regex = /<example7>(.*?)<example7>/s;
      var matchSeventhExample = textResult.match(regex);
      console.log('Aim Match ====', matchSeventhExample[1]);
      setSeventhExample(matchSeventhExample[1]);

      // Eighth Definition
      var regex = /<definition8>(.*?)<definition8>/s;
      var matcheighth = textResult.match(regex);
      console.log('Aim Match ====', matcheighth[1]);
      setEighthDefinition(matcheighth[1]);

      // Eighth Example
      var regex = /<example8>(.*?)<example8>/s;
      var matchEighthExample = textResult.match(regex);
      console.log('Aim Match ====', matchEighthExample[1]);
      setEighthExample(matchEighthExample[1]);

      // Ninth Definition
      var regex = /<definition9>(.*?)<definition9>/s;
      var matchNinth = textResult.match(regex);
      console.log('Aim Match ====', matchNinth[1]);
      setNinthDefinition(matchNinth[1]);

      // Ninth Example
      var regex = /<example9>(.*?)<example9>/s;
      var matchNinthExample = textResult.match(regex);
      console.log('Aim Match ====', matchNinthExample[1]);
      setNinthExample(matchNinthExample[1]);

      // Tenth Definition
      var regex = /<definition10>(.*?)<definition10>/s;
      var matchTenth = textResult.match(regex);
      console.log('Aim Match ====', matchTenth[1]);
      setTenthDefinition(matchTenth[1]);

      // Tenth Example
      var regex = /<example10>(.*?)<example10>/s;
      var matchTenthExample = textResult.match(regex);
      console.log('Aim Match ====', matchTenthExample[1]);
      setTenthExample(matchTenthExample[1]);

      // First Word
      var regex = /<word1>(.*?)<word1>/s;
      var matchWord = textResult.match(regex);
      console.log('Aim Match ====', matchWord[1]);
      setFirstWord(matchWord[1]);

      // Second Word
      var regex = /<word2>(.*?)<word2>/s;
      var matchWord2 = textResult.match(regex);
      console.log('Aim Match ====', matchWord2[1]);
      setSecondWord(matchWord2[1]);

      // Third Word
      var regex = /<word3>(.*?)<word3>/s;
      var matchWord3 = textResult.match(regex);
      console.log('Aim Match ====', matchWord3[1]);
      setThirdWord(matchWord3[1]);

      // Fourth Word
      var regex = /<word4>(.*?)<word4>/s;
      var matchWord4 = textResult.match(regex);
      console.log('Aim Match ====', matchWord4[1]);
      setFourthWord(matchWord4[1]);

      // Fifth Word
      var regex = /<word5>(.*?)<word5>/s;
      var matchWord5 = textResult.match(regex);
      console.log('Aim Match ====', matchWord5[1]);
      setFifthWord(matchWord5[1]);

      // Sixth Word
      var regex = /<word6>(.*?)<word6>/s;
      var matchWord6 = textResult.match(regex);
      console.log('Aim Match ====', matchWord6[1]);
      setSixthWord(matchWord6[1]);

      // Seventh Word
      var regex = /<word7>(.*?)<word7>/s;
      var matchWord7 = textResult.match(regex);
      console.log('Aim Match ====', matchWord7[1]);
      setSeventhWord(matchWord7[1]);

      // Eighth Word
      var regex = /<word8>(.*?)<word8>/s;
      var matchWord8 = textResult.match(regex);
      console.log('Aim Match ====', matchWord8[1]);
      setEighthWord(matchWord8[1]);

      // Ninth Word
      var regex = /<word9>(.*?)<word9>/s;
      var matchWord9 = textResult.match(regex);
      console.log('Aim Match ====', matchWord9[1]);
      setNinthWord(matchWord9[1]);

      // Tenth Word
      var regex = /<word10>(.*?)<word10>/s;
      var matchWord10 = textResult.match(regex);
      console.log('Aim Match ====', matchWord10[1]);
      setTenthWord(matchWord10[1]);

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
