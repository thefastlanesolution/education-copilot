// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const shotgunCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject, gradeLevel } = req.body;
  console.log('req param', req.body, subject, gradeLevel);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-002',
      prompt: `Give me 10 assessment, project, or classroom activity ideas for my ${gradeLevel} students.<br/>Topic: ${subject}. <br/>Okay, here's your list:<br/><br/>`,
      temperature: 0.8,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
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

export { shotgunCompletion };
