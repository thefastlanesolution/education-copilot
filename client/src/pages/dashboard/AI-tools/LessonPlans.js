import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const LessonPlan = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [text, setText] = useState('');

  async function fetchApi(subject, gradeLevel) {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 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',
      },
      body: JSON.stringify({
        model: 'text-davinci-002',
        prompt: `Area of Concentration: Communicative disorders, or initial sounds focusing on consonants and consonant blends.  \n\nGrade Level: pre-k / kindergarten\n\n<h1>Lesson Plan</h1><h4>Aim:</h4>The student will increase his/her conversational speech intelligibility with unfamiliar listeners in an unknown context. \n\n<h4>Goal:</h4> The student will produce the long sounds in the initial position of words. \n\n<h4>Materials Needed:</h4> Flashcards that have pictures of objects which names start with [sh], [ch], [j], [s] and [f] sounds.\n\n<h4>Anticipatory Set:</h4>\n-Teacher will explain that we are going to play a game where we have to identify different objects that start with the [sh], [ch], [j], [s] and [f] sounds.\n-Teacher will model the [sh], [ch], [j], [s] and [f] sounds for the class.\n-When students say the words correctly, give them a prize. If some students have trouble pronouncing any of the sounds, make note of it to ensure you can spend extra time with that child so they do not fall behind.\n\n<h4>Stated Objectives:</h4>\n- Students will imitatively use the long sounds in the initial position of words.\n- Students will use the long sounds in the initial word position following visual or verbal prompts. \n\n<h4>Modeled Practice:</h4>\n- The teacher will pick up a picture card and identify the object beginning with a long sound. He/she will speak in a slow, clear voice emphasizing the initial sound. - The teacher will ask students to raise their hand and try to pronounce the sound themselves. Optionally, the teacher may have every student pronounce the sound out loud, from their seat.\n\n<h4>Guided Practice:</h4>\n- Students are instructed to pick up the next picture card. The student is prompted to pronounce the object on the card. When a correct response is made, the student will trade cards with another student. When an incorrect response is made, the student is corrected and asked to repeat it again.\n\n<h4>Independent Practice:</h4>\nThe child is encouraged to continue on with the activity by himself/herself. He/she will be given a set of duplicate cards to take home or to use with friends during free time. Adults responsible for the child’s care or in daycare or kindergarten will be appraised of the activity and encouraged to offer praise doe the correct responses and offer help if incorrect responses are given.\n\n<h4>Closure:</h4>\n- For this lesson, when all of the cards have been read through, students can then choose one person to go around and collect the cards from everyone and turn them into the teacher.\n- At the beginning of the next lesson the same initial sounds will be reviewed [sh], [ch], [j], [s] and [f] sounds.\n- If this activity is done with the whole class, reading the story \"stone Soup\" would be a great way to end the activity\n\n###\n\nArea of concentration: division, multiplication, addition, and subtraction of whole numbers\n\nGrade Level: Middle School, 7th grade\n\n<h1>Lesson Plan</h1><h4>Aim:</h4>Students will use manipulatives in order learn new concepts.\n\n<h4>Goal:</h4> After using manipulatives, students will be able to draw on retrievable mental images to solve more complex or related problems.\n\n<h4>Materials Needed:</h4> \n-Multiple sets of pattern blocks, overhead projector . For this unit students will be using manipulative materials to help them understand the properties and operations of fractions in mathematics. Pattern blocks are the most helpful and common manipulative used to model fractions.\n\n<h4>Anticipatory Set:</h4> \"Today we will first review and discuss our knowledge of division, multiplication, addition, and subtraction of whole numbers. We will also discuss and review the concept of least common multiple (LCM), which is needed for fractional addition. Next, we will review fractional amounts by slicing and dividing a baked pizza. Finally, we will divide the pizza equally and eat it!\"\n\nActivity: The teacher begins and engages students in the related discussion, and then serves pizza after the students have helped divide it. These activities get the students ready to work with pattern blocks. Instead of pizza, types of dividable candy like mint patties or pastries could be used too. \n\n<h4>Stated Objectives</h4>\nThe students will be able to model the following operations with pattern blocks:\n- Multiplication - the repeated addition model or the area model.\n- Division - sharing model and measurement model.\n- Addition - grouping or set model.\n- Subtraction - taking away model.\nAt the end of the lesson, students will be able to use pattern blocks to solve five different problems from each of the four operations (20 problems).\nThe students will write their answers in simplest form, that is the number represented by the least number of blocks of the same color.\n\n<h4>Modeled Practice:</h4>\n\"Today we will use pattern blocks to model the operations of addition, subtraction, multiplication, and division of fractions. Every pattern block will represent a fractional unit. For example, the hexagon, trapezoid, rhombus, and triangle could represent the fractions of 1/4 , 1/3, 1/6, and 1/12. These pattern blocks can now be used to see the mathematical relationships that occur under a specific operation.\"\n\nThe teacher will model several examples of each operation on the overhead projector containing special pattern blocks. The examples include the concepts of finding a common denominator required in the adding or subtracting of fractions. Finally, reducing fractions is taught when there is more than one pattern block of the same shape or color in the final answer. \n\n<h4>Guided Practice:</h4>\n- The students will be given a set of pattern blocks to use to model a few of each operation listed on the board.\n- The teacher will observe the students and assist anyone who still does not understand how to model any of the problems. After the majority of the class has modeled the problems, students will volunteer to show their model on the overhead projector.\n- Here the student will verbally explain what was done and how he/she arrived at the final answer.\n- After the answer is presented, the students or teacher will discuss the correctness of his/her answer. \n\n<h4>Independent Practice:</h4>\n- Students will pair up and play a game involving fractions and pattern blocks called “Wipeout.” This is a two person game.\n\nThe game goes like this:\nFirst, you need a cube or dice with faces marked ¼, 1/3, 1/2, 1/5, 1/6, 1/8. The goal is to be the first to discard your blocks. Each person starts with the same number of hexagons, either one, two, or three. Follow these rules:\n1. Take turns rolling the cube.\n2. You have three options on each turn:\na) to remove a block (only if it is the fractional part of the hexagon indicated by the fraction face up on the cube),\nb) to exchange any of your remaining blocks for equivalent blocks, or\nc) or do nothing and pass the cube or dice to your partner *You may not remove a block and trade on the same turn; you can only do one or the other.\n\n\n<h4>Closure:</h4>\n- A brief homework exercise of 10 problems will be given to reinforce the fractional modeling concepts. The students will model each operation by drawing the shapes and showing what is being done. The next day, the students will volunteer to give the answers from their homework assignment. They will explain their model and how they solved the problem. Again, a class discussion will follow regarding the correctness of the answers given. The teacher will wrap-up the topic by summarizing the entire unit and allowing the class to ask any questions they may have relating to fractions and the use pattern blocks.\n\n###\n\nArea of concentration: AP Human Geography, the study of brain drain and it's effects in regards to human geography\n\nGrade Level: High School, 9th grade\n\n<h1>Lesson Plan</h1><h4>Aim:</h4>Students will learn about the concept of brain drain and it's effects in regards to human geography.\n\n<h4><h4>Goal:</h4></h4> Students will be able to apply the concept of brain drain to real world examples.\n\n<h4>Materials Needed:</h4> \n- Text book or handout covering the key aspects of brain drain\n- Hand out should cover: Why brain drain happens, what are the effects of brain drain on developing countries, etc.\n- Map of the world\n\n<h4>Anticipatory Set:</h4> \nThe teacher will start by showing a map of the world and asking the students to identify different countries. The teacher will then ask the students if they have ever heard of the term \"brain drain\" before. If the students have not heard of the term, the teacher will explain that brain drain is when people move from one place to another in order to find better opportunities. The teacher will ask the students if they can think of any examples of brain drain. If the students are having trouble coming up with examples, the teacher will provide some examples. \n\n<h4>Stated Objectives:</h4> \n- Students will be able to explain what brain drain is. \n- Students will be able to give examples of brain drain. \n- Students will be able to explain how brain drain can affect human geography. \n\n<h4>Modeled Practice:</h4> \nThe teacher will provide an example of brain drain and how it can affect human geography. For example, the teacher could talk about how many people from rural areas move to urban areas in search of better opportunities. This can lead to problems in rural areas such as a shortage of workers and a decrease in tax revenue. \n\n<h4><h4>Guided Practice:</h4></h4> \nThe teacher will divide the students into groups and give each group a different example of brain drain. The groups will then be asked to brainstorm ways in which brain drain can affect human geography. Each group will share their example and their thoughts with the rest of the class. \n\n<h4>Independent Practice:</h4> \nThe students will be given a list of countries and asked to research how brain drain has affected those countries. The students can use resources such as books, articles, and websites. The students will then write a short paper explaining their findings. \n\n<h4>Closure:</h4> \nThe teacher will ask the students to share their findings with the rest of the class. The teacher will then ask the students if they have any questions or if there is anything they would like to add.\n\n###\n\n Content Area: ${subject}\n\n Grade Level: ${gradeLevel}`, // eslint-disable-line
        temperature: 0.8,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['###'],
      }),
    });
    const json = await response.json();
    setCompletion(json.choices[0].text);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!subject) {
      displayAlert();
      return;
    }
    fetchApi(subject, gradeLevel);
  };

  return (
    <Wrapper>
      <Card
        sx={{
          width: '100%',
          maxWidth: '100%',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '5px',
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
              <h4>Lesson Planner 📝</h4>
              <FormRow
                type="text"
                labelText="Subject or lesson plan to generate benefits for:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Grade Level:"
                name="gradeLevel"
                value={gradeLevel}
                handleChange={e => setGradeLevel(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Lesson Plan'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>
              Save time and quickly draft lesson plans for any subject matter
              (even rocket science 🚀)
            </h5>
            <p>
              ✅ When providing the subject, be specific.
              <br />✅ Currently uses the Madeline Hunter Lesson Plan model.
              More to be added soon!
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

export default LessonPlan;
