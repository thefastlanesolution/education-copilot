// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const essentialQuestionsCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { overviewText } = req.body;
  console.log('req param', req.body, overviewText);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `${overviewText} Create 5 essential questions that student's should be able to answer for this lesson. \n\n Essential Questions: \n\n`,
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
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

export { essentialQuestionsCompletion };
