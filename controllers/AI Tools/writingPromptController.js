// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const writingPromptCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject } = req.body;
  console.log('req param', req.body, subject);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Topic: Intro to Periodic Table \n\n Writing Prompt:<title>All About The Periodic Table</title> <body>The periodic table is an incredibly useful and important tool in the world of chemistry and science as a whole. Developed by Dmitri Mendeleev in 1869, it arranges the known chemical elements in order of increasing atomic number and groups them based on their chemical properties. This system allows for easier prediction of the properties of new elements and has had a profound impact in fields such as chemistry, physics, and biology.\n\nNot only has the periodic table helped to advance our understanding of the structure and properties of matter, it has also served as a perfect example of how scientific knowledge can be organized and communicated in a concise and meaningful way. It has been used to create new materials, such as high-temperature superconductors, and to develop new sources of energy.\n\nSome examples of breakthroughs made possible by the development of the periodic table include:\n- The development of new materials and alloys for use in electronics and aerospace\n- Refinement of existing chemical processes, such as refining oil and producing fertilizers\n- Use of the atomic structure to explain the properties of different elements\n- Discovery of the nature of radiation and the behavior of elementary particles\n\nThe history of the periodic table dates back to the work of Johann Wolfgang Döbereiner, who developed a classification system for elements based on their atomic weights. This system was later refined by John Newlands, who noticed a pattern in the elements and arranged them in order of increasing atomic weight. However, it was Dmitri Mendeleev who is credited with the invention of the periodic table as we know it today. Using the data available at the time, he was able to arrange the elements into rows and columns to show their chemical similarities and differences.\n\nIn chemistry, the periodic table allows scientists to predict the properties of elements and compounds, as well as to understand how elements interact with each other. In physics, it provides important insights into the structure of matter and the nature of energy. And in biology, it helps to explain the function of proteins and enzymes.\n\nOver time the periodic table has been refined and updated as new elements were discovered and our understanding of chemistry and physics has grown. Updates such as the inclusion of transuranic elements, the addition of new families, and the addition of colors to symbolize groupings of elements, have all contributed to its usefulness as a teaching tool.\n\nThe most recent update to the periodic table came with the recognition of four new elements in 2016-2018, bringing the total number of elements in the periodic table to 118. These new elements are part of the f-block, which consists of elements with partially filled d and f orbitals. These elements have a wide range of applications, from medicine and electronics to lasers and quantum computing.\n\nThe periodic table is an essential part of modern scientific research and continues to be a powerful tool that helps us to understand and organize the world around us. Its simple design and universal organization has made it one of the most iconic symbols of science, and it remains a valuable resource for students and researchers alike.</body> <instructions>Student Instructions</instructions> <questions>— What are some of the breakthroughs that have been made possible by the periodic table? \n\n— What is the importance of the periodic table? \n\n— How did Dmitri Mendeleev create the periodic table as we know it today? \n\n— How do elements interact with each other based on their positions in the periodic table? \n\n— How has the periodic table been updated since it was created? \n\n— What are some of the ways in which the periodic table has been used to advance science?</questions> ### Topic:${subject} \n\n Writing Prompt:`,
      temperature: 0.8,
      max_tokens: 1500,
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

export { writingPromptCompletion };
