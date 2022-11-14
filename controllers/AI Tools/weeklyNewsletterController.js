// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const weeklyNewsletterCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const {
    firstTopic,
    secondTopic,
    thirdTopic,
    fourthTopic,
    fifthTopic,
    gradeLevel,
  } = req.body;
  console.log(
    'req param',
    req.body,
    firstTopic,
    secondTopic,
    thirdTopic,
    fourthTopic,
    fifthTopic,
    gradeLevel
  );
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-002',
      prompt: `Create a weekly newsletter that covers what we will be learning during the week for my 9th grade AP human geography class. Topics:immigration, emigration, brain drain<h2>Hi everyone!</h2>This week in AP human geography we'll be focusing on immigration, emigration, and brain drain.<br/><br/>We'll start by discussing what immigration and emigration are. Immigration is when people move into a new country, and emigration is when people leave a country. We'll talk about the reasons why people might choose to move to a new country, and some of the challenges they might face.<br/><br/>We will also be learning about brain drain. This is when people with high levels of education and skills leave a country to go to another country where they can get better jobs. We'll discuss the effects of brain drain on both the sending and receiving countries in depth throughout this week's lessons.<br/><br/>Can't wait to see you all in class! I hope you're all ready to learn about immigration, emigration and brain drain.<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 6th grade elementary school class. Topics: Fractions, adding fractions, subtracting fractions, past tense and future tense, what the human body is made up of<h2>Hello Class!</h2>This week we will be learning about fractions, adding fractions, subtracting fractions, past tense and future tense, and what the human body is made up of..<br/><br/>For math, we will start by discussing fractions. A fraction is a number that represents a part of a whole. We will talk about what makes fractions, as well as how to add and subtract them..<br/><br/>When it comes to English language arts, we will learn about past tense and future tense. Past tense is when you talk about something that has already happened, and future tense is when you talk about something that will happen. We will learn how to conjugate verbs to change them into past tense or future tense..<br/><br/>Finally, we will learn about what the human body is made up of. We will talk about the different organs in the human body and what they do..<br/><br/>That's all for this week! I hope you're all ready to learn about fractions, past tense and future tense, and the different functions of the human body!<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 12th grade economics class. Topics: microeconomics vs macroeconomics, competition in marketplaces, market structures<h2>Hello everyone!</h2>This week in economics we'll be focusing on microeconomics vs macroeconomics, competition in marketplaces, and market structures.<br/><br/>We'll start by discussing what microeconomics and macroeconomics are. Microeconomics focuses on individual units such as households and firms, while macroeconomics looks at the economy as a whole. We'll talk about the different aspects of each and how they impact the economy.<br/><br/>We will also be learning about competition in marketplaces. We'll discuss what competition is and how it affects businesses and consumers. We'll also talk about the different types of market structures and how they impact competition.<br/><br/>Let's have a great start to the week! I hope you're all ready to learn about microeconomics, macroeconomics, and competition in marketplaces!<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 12th grade economics class. Topics: periodic table, atomic mass, 118 Elements and Their Symbols<h2>Hi Everyone!</h2>This week in class we will be learning about the periodic table, atomic mass, and 118 Elements and Their Symbols.<br/><br/>We will start by learning about the periodic table. The periodic table is a chart that shows the elements in order of their atomic number. We will talk about how the periodic table is organized and what information it can tell us about the elements.<br/><br/>We will also be learning about atomic mass. Atomic mass is the amount of matter in an atom. We will talk about how atomic mass is measured and what factors can affect it.<br/><br/>In addition, we will learn about the 118 elements and their symbols. We will talk about what each element is and what its symbol represents. We will also talk about some of the properties of the elements.<br/><br/>That's all for this week! Be sure to study the periodic table, atomic mass, and 118 elements and their symbols so that you're prepared for this week's lessons.<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 12th grade economics class. Topics: periodic table, atomic mass, 118 Elements and Their Symbols<h2>Hi Everyone!</h2>This week in class we will be learning about Remote Sensing, Geographic Information Systems, Remote sensing in imagery and other data collected from satellites, balloons, and drones<h2>Hi Everyone!</h2>This week in class we will be learning about Remote Sensing, Geographic Information Systems, and Remote sensing in imagery and other data collected from satellites, balloons, and drones.<br/><br/>We will start by discussing what remote sensing is and how it is used. We will talk about the different types of remote sensing, as well as the benefits and limitations of using it.<br/><br/>Next, we will learn about geographic information systems. Geographic information systems are used to store, manipulate, and analyze geographic data. We will talk about how geographic information systems are used and some of the benefits of using them.<br/><br/>Finally, we will talk about remote sensing in imagery and other data collected from satellites, balloons, and drones. We will discuss how this data is collected and what it can be used for. We will also talk about some of the benefits and limitations of using this type of data.<br/><br/>That's all for this week! Be sure to study remote sensing, geographic information systems, and remote sensing in imagery and other data collected from satellites, balloons, and drones so that you're prepared for this week's lessons.<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my ${gradeLevel} class. Topics ${firstTopic}, ${secondTopic}, ${thirdTopic}, ${fourthTopic}, ${fifthTopic}`,
      temperature: 0.7,
      max_tokens: 982,
      top_p: 1,
      frequency_penalty: 0,
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

export { weeklyNewsletterCompletion };
