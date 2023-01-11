// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const quizQuestionCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { gradeLevel, subject, quizCovers, questions } = req.body;
  console.log(
    'req param',
    req.body,
    gradeLevel,
    subject,
    quizCovers,
    questions
  );
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Subject: Great depression\n\nGrade Level: 6th Grade\n\nQuiz Covers:\n- The causes of the Great Depression\n- The effects of the Great Depression on people, businesses, and the economy\n- The role of the US government in responding to the Great Depression\n- The impact of the Great Depression on social and political life in the United States\n- The historical significance of the Great Depression\n- The legacy of the Great Depression for American society\n\nQuestions:\n- What year did the Great Depression begin?\n- What event is widely considered to have started the Great Depression?\n- What effect did the Great Depression have on businesses?\n- What government program was created to help the unemployed during the Great Depression?\n- What were the effects of the Great Depression on the American people?\n\nTask:\n\nGenerate 1 new multiple choice question and answer set about the Great Depression.\n\nQuestion: <question>What was the main purpose of President Roosevelt's New Deal?</question>\n<answer>A. To end the Great Depression\nB. To stimulate economic growth\nC. To increase taxes\nD. To reduce unemployment</answer><key>D. To reduce unemployment</key>\n\n ###\n\nSubject: Ecosystems\n\nGrade Level: 9th grade, biology\n\nQuiz Covers:\n- The concept of an ecosystem\n- The components of an ecosystem\n- The roles of producers, consumers, and decomposers in an ecosystem\n- The effects of human activity on ecosystems\n- Factors that affect the stability of an ecosystem\n\nQuestions:\n- What is an ecosystem?\n- What are the components of an ecosystem?\n- What roles do producers, consumers, and decomposers play in an ecosystem?\n- How does human activity affect the balance of an ecosystem? \n- How can human actions help maintain a stable ecosystem? \n\nTask:\nGenerate 1 new multiple choice question and answer set about ecosystems.\n\nQuestion: <question>What type of organism is involved in the process of photosynthesis?</question>\n<answer>A. Producer\nB. Consumer\nC. Decomposer\nD. Herbivore</answer><key>A. Producer</key>\n\n ###\n\nSubject: ${subject}\n\nGrade Level: ${gradeLevel}\n\nQuiz Covers: ${quizCovers}\n\nQuestions: ${questions}\n\nTask:\n\nGenerate 1 new multiple choice question and answer set about ${subject}. Question:\n\n`,
      temperature: 0.8,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
      logit_bias: { 25652: +1, 41484: +1, 2539: +1 },
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

export { quizQuestionCompletion };
