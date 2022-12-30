// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const unitObjectivesCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { unitName, subject, unitDetails } = req.body;
  console.log('req param', req.body, unitName, subject, unitDetails);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Unit Name: Ancient Egypt Civilization\n\nSubject: 6th grade, History / Social Studies\n\nThis Unit Should Cover:\n\n- Geography and climate of Ancient Egypt\n\n- Egyptian social structure and roles\n\n- Political structure of Ancient Egypt\n\n- Religion and spiritual beliefs in Ancient Egypt\n- Egyptian culture, art, and writing\n\n- Daily life and technology in Ancient Egypt\n\n- Military campaigns, wars, and conquests\n\n- Development of trade and economics in Ancient Egypt\n\n- Legacy of Ancient Egypt\n\nUnit Objectives:\nBy the end of this unit, students will be able to:\n\n- Describe the geography, climate, and political structure of Ancient Egypt\n\n- Explain the social roles and religion of Ancient Egypt\n\n- Discuss the culture, art, and writing of Ancient Egypt\n\n- Analyze the technology and daily life of Ancient Egypt\n\n- Summarize the military campaigns, wars, and conquests of Ancient Egypt\n\n- Understand the development of trade and economics in Ancient Egypt\n- Illustrate the legacy of Ancient Egypt on modern society\n\n ### \n\nUnit Name: ${unitName}\n\nSubject: ${subject}\n\nThis Unit Should Cover:\n${unitDetails}\n\nUnit Objectives:\n\n`,
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

export { unitObjectivesCompletion };
