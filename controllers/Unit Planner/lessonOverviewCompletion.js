// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const lessonOverviewCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { lessonOverviewText, unitName, day, title } = req.body;
  console.log('req param', req.body, lessonOverviewText, unitName, day, title);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Unit: ${unitName}\n${day}: ${title}\nLesson Overview:\n${lessonOverviewText}\nGenerate a new lesson overview based on what ${day} is about, ${title}\nLesson Overview:\n`,
      temperature: 0.7,
      max_tokens: 350,
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

export { lessonOverviewCompletion };
