// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const quizGeneratorCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject, gradeLevel, quizCovers } = req.body;
  console.log('req param', req.body, subject, gradeLevel, quizCovers);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Topic + Keywords: The great depression\n\nQuiz Covers: \n- Causes of the Great Depression\n- The impact of the Great Depression on different countries\n- Major political events during the Great Depression\n- Changes in the economy during the Great Depression\n- Social and cultural aspects of the Great Depression\n- The role of government in responding to the Great Depression\n\nGrade Level: 6th grade, Us history/social studies\n\nNumber of questions: 5\n\nQuestions: \n\n1. <question1>What was the cause of the great depression?</question1>\n<answer1>A. The stock market crash of 1929\nB. Unequal distribution of wealth\nC. A lack of government regulation\nD. Increased taxes</answer1>\n<key1>A.  The stock market crash of 1929</key1>\n\n2. <question2>What year did the great depression begin?</question2>\n<answer2>A. 1925\nB. 1929\nC. 1933\nD. 1937</answer2>\n<key2>B. 1929</key2>\n\n3. <question3>What was the purpose of the New Deal?</question3>\n<answer3>A. To provide economic relief to citizens\nB. To increase government regulation\nC. To promote international trade\nD. To reduce taxes</answer3>\n<key3>A. To provide economic relief to citizens</key3>\n\n4. <question4>What was the name of the federal agency established to provide economic aid during the Great Depression?</question4>\n<answer4>A. The Federal Emergency Relief Administration\nB. The Works Progress Administration\nC. The Federal Reserve System\nD. The Securities and Exchange Commission</answer4>\n<key4>B. The Works Progress Administration</key4>\n\n5. <question5>What was the name of the program that provided jobs to unemployed Americans during the Great Depression?</question5>\n<answer5>A. The New Deal\nB. The Emergency Relief Act\nC. The Federal Reserve System\nD. The Works Progress Administration</answer5>\n<key5>D. The Works Progress Administration</key5>\n\n ###\n\nTopic + Keywords: ${subject}\n\nQuiz Covers: ${quizCovers} \n\nGrade Level: ${gradeLevel}\n\nNumber of questions: 5\n\nQuestions: \n\n`,
      temperature: 0.7,
      max_tokens: 2600,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: [' ###'],
    })
    .then(response => {
      console.log('openai res ===', response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log('openai res err ===', err);
      return err;
    });
};

export { quizGeneratorCompletion };
