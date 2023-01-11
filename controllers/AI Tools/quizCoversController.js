// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const quizCoversCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { gradeLevel, subject } = req.body;
  console.log('req param', req.body, gradeLevel, subject);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Topic + Keywords:\nBusiness Management, introduction to business management\n\nGrade Level:\nhigh school business class\n\nQuiz Covers:\n\nThis quiz should include questions related to...\n\n- The purpose of business management\n- The different types of business management\n- The roles and responsibilities of a business manager\n- The impact of business management on the success of a business\n- The importance of effective communication in business management\n- The importance of setting goals and objectives in business management\n- The strategies for problem-solving in business management\n- The importance of planning and budgeting in business management\n- The role of technology in business management\n- The benefits of working in teams for business management\n\n###\n\nTopic + Keywords: ${subject}\n\nGrade Level: ${gradeLevel}\n\nQuiz Covers:\n\n`,
      temperature: 0.75,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
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

export { quizCoversCompletion };
