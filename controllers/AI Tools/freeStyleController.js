// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const freeStyleCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject } = req.body;
  console.log('req param', req.body, subject);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `${subject}`,
      temperature: 0.85,
      max_tokens: 2500,
      top_p: 1,
      frequency_penalty: 0.0,
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

export { freeStyleCompletion };
