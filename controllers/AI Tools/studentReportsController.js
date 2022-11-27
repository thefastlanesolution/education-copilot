// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const studentReportsCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { studentName, potential, improvement, gradeLevel } = req.body;
  console.log(
    'req param',
    req.body,
    studentName,
    potential,
    improvement,
    gradeLevel
  );
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-002',
      prompt: `I am a teacher that wants to create reports aimed at parents (not other teachers) so no jargon, that has the following structure and are less than 600 characters: \n\nName: Johnny \n\nSubject: Teaching English to new arrivals \n\nNotable areas where student shows potential: Can identify main ideas when reading, can write opinions and give a detailed recount, great at studying. \n\nAreas that could use improvement: has difficulty with grammar \n\n Report:<br/><br/>Johnny is an enthusiastic student who is always keen to participate in classroom discussions. This term, he has demonstrated that he can write both a simple opinion and a detailed recount. Johnny has also shown that he is able to identify the main ideas when reading a written text. He is still developing his spoken English but this will further improve with time. I can tell that Johnny has been studying English and this is evident in his progress. He is able to understand and use a variety of vocabulary and his grammar is improving. Johnny has the study skills that are necessary for rapidly picking up English and he has exceeded expectations with the ease at which he deals with difficult grammar. To continue improving, he should practice speaking English outside of the classroom. A few ways you may be able to help him with this are by talking with him in English at home, watching English TV shows with him, listening to English music, or reading English books together. \n\n ###\n\n I am a teacher that wants to create reports aimed at parents (not other teachers) so no jargon, that has the following structure and are less than 600 characters: \n\nName: Devin \n\nSubject: 9th grade AP human geography \n\nNotable areas where student shows potential: Is very interested in the subject and is always asking questions in class. Specifically about different cultures and how they interact with each other. \n\nAreas that could use improvement: Devin sometimes has trouble getting started on his work and meeting deadlines.\n\nReport:<br/><br/>Devin is a very inquisitive student who is always asking questions in class about different cultures and how they interact with each other. He is very interested in the subject and this helps him to participate in class discussions. Devin sometimes has trouble getting started on his work and meeting deadlines, but I believe that if he can learn to manage his time better he will be able to succeed in this class. He has the potential to do very well in this class and overall he is a great student to have in my class. It should be noted that he does well on projects and works great in groups too. In regards to areas that could use improvement, I would recommend that Devin tries to start his work as soon as possible once he gets home and to break his assignments up into smaller tasks so that they don't seem as daunting. One idea I might add that may help with this is to have him create a list of what needs to be done and then checking each task off as he completes it. \n\n ###\n\n  I am a teacher that wants to create reports aimed at parents (not other teachers) so no jargon, that has the following structure and are less than 600 characters: \n\nName: Michael\n\nSubject: 11th grade economics \n\nNotable areas where student shows potential: he's a great thinker and asks wonderful questions when it comes to macroeconomics and how the world works at large \n\nAreas that could use improvement:needs to focus on completing homework and studying for tests. Grade does not reflect how bright Michael is \n\nReport:<br/><br/>Michael is a great, outside of the box thinker. He asks wonderful questions when it comes to macroeconomics and how the world works at large. He has the potential to do very well in this class, but he needs to focus on completing homework and studying for tests. His grade does not reflect how bright he is. I would recommend that Michael try to get his homework done as soon as possible after school and to study for tests a few days in advance. One idea I might add that may help with this is to have him create a list that includes his upcoming assignments and test dates. From here, it'll be easier for him to break down and conceptualize what he needs to get done. ###  \n\n I am a teacher that wants to create reports aimed at parents (not other teachers) so no jargon, that has the following structure and are less than 600 characters: \n\nName: Binadee \n\nSubject: Year 10 Japanese \n\nNotable areas where student shows potential: Applied semester 2 knowledge into the exam  \n\nAreas that could use improvement: Translation and reading comprehension in Japanese \n\nReport:<br/><br/>Binadee did very well in her exams, she was able to apply the knowledge from semester 2 and got full marks in the exam. However, she still needs to improve on her translation and reading comprehension skills in Japanese. I would recommend that she practices these skills more often so that she can become more proficient in them. One way to do this is to write down the English translations of things she sees in Japanese and then later check to see if she was able to correctly translate it. ### \n\n I am a teacher that wants to create reports aimed at parents (not other teachers) so no jargon, that has the following structure and are less than 600 characters: \n\nName: ${studentName} \n\nSubject: ${gradeLevel} \n\nNotable areas where student shows potential: ${potential}  \n\nAreas that could use improvement: ${improvement} \n\n`,
      temperature: 0.8,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.4,
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

export { studentReportsCompletion };
