// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const unitIdeaCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { unitName, subject } = req.body;
  console.log('req param', req.body, unitName, subject);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Unit Name: Ancient Egypt Civilization\n\nSubject: 6th grade, History / Social Studies\n\nThis Unit Should Cover:\n\n-Geography and climate of Ancient Egypt\n\n-Egyptian social structure and roles\n\n-Political structure of Ancient Egypt\n\n-Religion and spiritual beliefs in Ancient Egypt\n\n-Egyptian culture, art, and writing\n\n-Daily life and technology in Ancient Egypt\n\n-Military campaigns, wars, and conquests\n\n-Development of trade and economics in Ancient Egypt\n\n-Legacy of Ancient Egypt ### \n\nUnit Name: ${unitName}\n\nSubject: ${subject}\n\nThis Unit Should Cover:\n\n`,
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

export { unitIdeaCompletion };
