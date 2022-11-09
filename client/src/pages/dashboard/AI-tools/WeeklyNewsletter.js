import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const WeeklyNewsletter = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [firstTopic, setFirstTopic] = useState('');
  const [secondTopic, setSecondTopic] = useState('');
  const [thirdTopic, setThirdTopic] = useState('');
  const [fourthTopic, setFourthTopic] = useState('');
  const [fifthTopic, setFifthTopic] = useState('');
  const [reminders, setReminders] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [text, setText] = useState('');

  async function fetchApi(
    firstTopic,
    secondTopic,
    thirdTopic,
    fourthTopic,
    fifthTopic,
    gradeLevel
  ) {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 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',
      },
      body: JSON.stringify({
        model: 'text-davinci-002',
        prompt: `Create a weekly newsletter that covers what we will be learning during the week for my 9th grade AP human geography class. Topics:immigration, emigration, brain drain<h2>Hi everyone!</h2>This week in AP human geography we'll be focusing on immigration, emigration, and brain drain.<br/><br/>We'll start by discussing what immigration and emigration are. Immigration is when people move into a new country, and emigration is when people leave a country. We'll talk about the reasons why people might choose to move to a new country, and some of the challenges they might face.<br/><br/>We will also be learning about brain drain. This is when people with high levels of education and skills leave a country to go to another country where they can get better jobs. We'll discuss the effects of brain drain on both the sending and receiving countries in depth throughout this week's lessons.<br/><br/>Can't wait to see you all in class! I hope you're all ready to learn about immigration, emigration and brain drain.<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 6th grade elementary school class. Topics: Fractions, adding fractions, subtracting fractions, past tense and future tense, what the human body is made up of<h2>Hello Class!</h2>This week we will be learning about fractions, adding fractions, subtracting fractions, past tense and future tense, and what the human body is made up of..<br/><br/>For math, we will start by discussing fractions. A fraction is a number that represents a part of a whole. We will talk about what makes fractions, as well as how to add and subtract them..<br/><br/>When it comes to English language arts, we will learn about past tense and future tense. Past tense is when you talk about something that has already happened, and future tense is when you talk about something that will happen. We will learn how to conjugate verbs to change them into past tense or future tense..<br/><br/>Finally, we will learn about what the human body is made up of. We will talk about the different organs in the human body and what they do..<br/><br/>That's all for this week! I hope you're all ready to learn about fractions, past tense and future tense, and the different functions of the human body!<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 12th grade economics class. Topics: microeconomics vs macroeconomics, competition in marketplaces, market structures<h2>Hello everyone!</h2>This week in economics we'll be focusing on microeconomics vs macroeconomics, competition in marketplaces, and market structures.<br/><br/>We'll start by discussing what microeconomics and macroeconomics are. Microeconomics focuses on individual units such as households and firms, while macroeconomics looks at the economy as a whole. We'll talk about the different aspects of each and how they impact the economy.<br/><br/>We will also be learning about competition in marketplaces. We'll discuss what competition is and how it affects businesses and consumers. We'll also talk about the different types of market structures and how they impact competition.<br/><br/>Let's have a great start to the week! I hope you're all ready to learn about microeconomics, macroeconomics, and competition in marketplaces!<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 12th grade economics class. Topics: periodic table, atomic mass, 118 Elements and Their Symbols<h2>Hi Everyone!</h2>This week in class we will be learning about the periodic table, atomic mass, and 118 Elements and Their Symbols.<br/><br/>We will start by learning about the periodic table. The periodic table is a chart that shows the elements in order of their atomic number. We will talk about how the periodic table is organized and what information it can tell us about the elements.<br/><br/>We will also be learning about atomic mass. Atomic mass is the amount of matter in an atom. We will talk about how atomic mass is measured and what factors can affect it.<br/><br/>In addition, we will learn about the 118 elements and their symbols. We will talk about what each element is and what its symbol represents. We will also talk about some of the properties of the elements.<br/><br/>That's all for this week! Be sure to study the periodic table, atomic mass, and 118 elements and their symbols so that you're prepared for this week's lessons.<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my 12th grade economics class. Topics: periodic table, atomic mass, 118 Elements and Their Symbols<h2>Hi Everyone!</h2>This week in class we will be learning about Remote Sensing, Geographic Information Systems, Remote sensing in imagery and other data collected from satellites, balloons, and drones<h2>Hi Everyone!</h2>This week in class we will be learning about Remote Sensing, Geographic Information Systems, and Remote sensing in imagery and other data collected from satellites, balloons, and drones.<br/><br/>We will start by discussing what remote sensing is and how it is used. We will talk about the different types of remote sensing, as well as the benefits and limitations of using it.<br/><br/>Next, we will learn about geographic information systems. Geographic information systems are used to store, manipulate, and analyze geographic data. We will talk about how geographic information systems are used and some of the benefits of using them.<br/><br/>Finally, we will talk about remote sensing in imagery and other data collected from satellites, balloons, and drones. We will discuss how this data is collected and what it can be used for. We will also talk about some of the benefits and limitations of using this type of data.<br/><br/>That's all for this week! Be sure to study remote sensing, geographic information systems, and remote sensing in imagery and other data collected from satellites, balloons, and drones so that you're prepared for this week's lessons.<br/><br/>Sincerely,<br/>[Teacher's name] ### Create a weekly newsletter that covers what we will be learning during the week for my ${gradeLevel} class. Topics ${firstTopic}, ${secondTopic}, ${thirdTopic}, ${fourthTopic}, ${fifthTopic}`,
        temperature: 0.7,
        max_tokens: 982,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: [' ###'],
      }),
    });
    const json = await response.json();
    setCompletion(json.choices[0].text);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!firstTopic) {
      displayAlert();
      return;
    }
    fetchApi(
      firstTopic,
      secondTopic,
      thirdTopic,
      fourthTopic,
      fifthTopic,
      reminders,
      gradeLevel
    );
  };

  return (
    <Wrapper>
      <Card
        sx={{
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
        className="input-card"
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="form-center">
              <h4>Weekly Newsletter 🍎</h4>
              <FormRow
                type="text"
                labelText="Topic 1:"
                name="firstTopic"
                value={firstTopic}
                handleChange={e => setFirstTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 2:"
                name="secondTopic"
                value={secondTopic}
                handleChange={e => setSecondTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 3:"
                name="thirdTopic"
                value={thirdTopic}
                handleChange={e => setThirdTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 4:"
                name="fourthTopic"
                value={fourthTopic}
                handleChange={e => setFourthTopic(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Topic 5:"
                name="fifthTopic"
                value={fifthTopic}
                handleChange={e => setFifthTopic(e.target.value)}
              />
              {/* <FormRow
                type="text"
                labelText="Reminders, notes, other details:"
                name="reminders"
                value={reminders}
                handleChange={e => setReminders(e.target.value)}
              /> */}
              <FormRow
                type="text"
                labelText="Grade Level (And subject if applicable):"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Newsletter'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>Generate a weekly newsletter to send out or print.</h5>
            <p>
              ✅ Be as brief or specific with the topics as you'd like.
              <br />
              ✅ A great newsletter will cover multiple different topics,
              activities, and areas of discussion.
              <br />✅ The goal of this newsletter is to inform both students
              and parents what will be covered throughout the following week!
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="editor">
        <CKEditor
          editor={Editor}
          data={completion}
          onchange={(event, editor) => {
            const data = editor.setData('hello world');
            setText(data);
          }}
        ></CKEditor>
      </div>
    </Wrapper>
  );
};

export default WeeklyNewsletter;
