import { decode } from 'html-entities';

export function fetchLessonPlan(
  subject,
  gradeLevel,
  setIsLoading,
  setCompletion,
  setLessonHasChanged,
  setAimSection,
  setObjectivesSection,
  setMaterialsSection,
  setAnticipatorySection,
  setModeledSection,
  setGuidedSection,
  setIndependentPractice,
  setClosureSection,
  setStruggleSection
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
      var regex = /<aim>(.*?)<aim>/s;
      var matchAim = textResult.match(regex);
      // console.log('Aim Match ====', matchAim[1]);
      setAimSection(matchAim[1]);

      // Objectives
      var regex = /<objectives>(.*?)<objectives>/s;
      var matchObjectives = textResult.match(regex);
      // console.log('Objectives Match ====', matchObjectives[1]);
      setObjectivesSection(matchObjectives[1]);

      // Materials Needed
      var regex = /<materials>(.*?)<materials>/s;
      var matchMaterials = textResult.match(regex);
      // console.log('Materials Match ====', matchMaterials[1]);
      setMaterialsSection(matchMaterials[1]);

      // Anticipatory Set
      var regex = /<anticipatory>(.*?)<anticipatory>/s;
      var matchAnticipatory = textResult.match(regex);
      // console.log('Objectives Match ====', matchAnticipatory[1]);
      setAnticipatorySection(matchAnticipatory[1]);

      // Modeled Practice
      var regex = /<modeled>(.*?)<modeled>/s;
      var matchModeled = textResult.match(regex);
      //console.log('Aim Match ====', matchModeled[1]);
      setModeledSection(matchModeled[1]);

      // Guided Practice
      var regex = /<guided>(.*?)<guided>/s;
      var matchGuided = textResult.match(regex);
      //console.log('Objectives Match ====', matchGuided[1]);
      setGuidedSection(matchGuided[1]);

      // Independent Practice
      var regex = /<independent>(.*?)<independent>/s;
      var matchIndependent = textResult.match(regex);
      // console.log('Aim Match ====', matchIndependent[1]);
      setIndependentPractice(matchIndependent[1]);

      // Struggle
      var regex = /<struggles>(.*?)<struggles>/s;
      var matchStruggle = textResult.match(regex);
      // console.log('Objectives Match ====', matchStruggle[1]);
      setStruggleSection(matchStruggle[1]);

      // Closure
      var regex = /<closure>(.*?)<closure>/s;
      var matchClosure = textResult.match(regex);
      // console.log('Aim Match ====', matchClosure[1]);
      setClosureSection(matchClosure[1]);

      setLessonHasChanged(true);

      // wait 100 ms before setting the documentHasChanged state to false
      setTimeout(() => {
        setLessonHasChanged(false);
      }, 100);

      const dataToSave = {
        subject,
        gradeLevel,
        application: 'Lesson Planner V2',
        generatedText: result.choices[0].text,
      };
    })
    .catch(error => console.log('error', error));
}
