// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const educationalHandoutCompletionUnit = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { overviewText, gradeLevel } = req.body;
  console.log('req param', req.body, overviewText, gradeLevel);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Task: Create an educational handout about brain drain for my 9th grade AP human geography class. Include detailed examples with supporting context, provide thought provoking questions, multiple paragraphs for each section, and more to help engage and build the understanding of students who are learning about brain drain. <title>Brain Drain</title> <handoutcovers>- What is brain drain?\n- Reasons for brain drain\n- Examples of brain drain\n- Effects of brain drain on countries, culture, and more\n- Solutions for brain drain\n- Conclusion</handoutcovers> <header1>What is Brain Drain?</header1> <body1>Brain Drain, also known as human capital flight, is the mass exodus of highly skilled and educated individuals from one country to another. It occurs when a country's best and brightest citizens move abroad in search of better economic opportunities and improved quality of life. Brain drain can have a negative impact on the country they are leaving, as it reduces the available talent pool and can lead to a decrease in economic growth. \n\nSome of the main areas of expertise which can be affected by brain drain include: doctors, engineers, scientists, IT professionals, and educators. We will cover more reasons why this happens throughout the document and we'll be exploring solutions to this global problem. \n\nLet's explore some of the causes and effects of this global phenomenon.</body1> <header2>Reasons for Brain Drain</header2> <body2>Brain drain is often caused by economic factors, such as low wages, limited job opportunities, and unstable economic conditions. It is also caused by social factors, such as limited educational opportunities and inadequate healthcare services. Political factors such as oppressive governments or limited civil liberties can also contribute to brain drain. Additionally, environmental factors such as climate change and natural disasters can cause people to leave their home country in search of a better quality of life.\n\nIn summary, the main reason for brain drain are... \n- Economic factors such as low wages, limited job opportunities, and unstable economic conditions \n- Social factors such as limited educational opportunities and inadequate healthcare services \n- Political factors such as oppressive governments or limited civil liberties \n- Environmental factors such as climate change and natural disasters \n\nIt should be noted that while these factors can be a major contributor to brain drain, they are not the only factors. Other factors such as family ties and personal preference can also play a role in someone's decision to move abroad.</body2> <header3>Examples of brain drain</header3> <body3>One example of brain drain is the migration of skilled professionals from India to the United States. Every year, thousands of highly educated Indians move to the United States in search of better job opportunities and higher wages. This has led to a shortage of skilled workers in India, resulting in a decrease in economic growth. \n\nAnother example is the migration of skilled labor from Mexico to the United States. Every year, thousands of Mexicans move to the United States in search of better job opportunities and higher wages. This has led to a decrease in Mexico's labor pool and has had an adverse effect on their economy. \n\nSome of the most popular brain drain scenarios include \n- Migration of skilled professionals from India to the United States \n- Migration of skilled labor from Mexico to the United States \n- Migration of refugee and asylum seekers from war torn countries \n- Migration of scientists and academics from African countries to Europe and North America</body3> <header4>Effects of brain drain on countries, culture, and more</header4> <body4>The effects of brain drain can be felt at both the national and international levels. At the national level, it can lead to a decline in economic growth due to a lack of skilled workers and a decrease in productivity. It can also lead to a decline in social services such as healthcare and education due to a lack of qualified professionals. \n\nAt the international level, it can lead to an increase in inequality between countries due to the movement of highly trained individuals from poorer countries to richer ones. Additionally, it can lead to a decrease in cultural diversity as people from different backgrounds migrate away from their home countries. Finally, it can lead to an increase in competition for jobs as more highly trained individuals enter new labor markets.</body4> <header5>Solutions for brain drain</header5> <body5>There are several potential solutions for addressing brain drain at both the national and international levels. At the national level, governments can improve economic conditions by reducing poverty, increasing wages, and creating job opportunities for their citizens. They can also invest in education and healthcare services to improve quality of life and discourage citizens from leaving the country. \n\nAt the international level, governments can work together to create policies that reduce inequality between countries. They can also provide financial support for poorer nations to help alleviate poverty and create job opportunities for their citizens. Additionally, governments can create international programs that encourage the exchange of knowledge between countries and promote cultural understanding between different populations.\n\nCan you think of any other potential solutions? Brain drain can be addressed by governments and individuals alike. Individuals living abroad can use their skills and expertise to help their home countries. They can volunteer to mentor people back home, share their knowledge, or create job opportunities for those still living in their home countries. \n\nBrain drain can also be addressed through policies that promote international cooperation and cultural exchange. Governments can create programs that facilitate the exchange of knowledge between countries, allowing people from different backgrounds to learn from each other and build mutual understanding.</body5> <header6>Conclusion</header6> <body6>Brain Drain is an issue that affects many countries around the world. It occurs when highly skilled individuals leave their home countries in search of better economic opportunities or improved quality of life elsewhere.\n\nBrain drain can have serious consequences for countries at both the national and international levels... \n- It reduces economic growth due to a lack of skilled workers \n- Increases inequality between countries due to the movement of highly trained individuals from poorer countries to richer ones \n- Decreases cultural diversity as people migrate away from their home countries, and increases competition for jobs as more highly trained individuals enter new labor markets. \n\nHowever, there are potential solutions for addressing this issue... \n- Governments can improve economic conditions by reducing poverty and increasing wages \n- Invest in education and healthcare services; create policies that reduce inequality between countries \n- Provide financial support for poorer nations\n- Create international programs that encourage knowledge exchange between countries.</body6> ### Task: Create an educational handout about ${overviewText} for my ${gradeLevel} class. Include detailed examples with supporting context, provide thought provoking questions, multiple paragraphs for each section, and more to help engage and build the understanding of students.`,
      temperature: 0.75,
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

export { educationalHandoutCompletionUnit };
