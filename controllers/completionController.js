// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const newCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject } = req.body;
  console.log('req param', req.body, subject);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-002',
      prompt: `### Subject: ${subject} Task: Give me 5 ways that learning about ${subject}, will help my students in their real life:`,
      temperature: 0.8,
      max_tokens: 1500,
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

export { newCompletion };
