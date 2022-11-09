import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const ResearchProjectGenerator = () => {
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
        prompt: `Generate a research project for my 10th grade chemistry class. Topic: periodic table<h4>Project Name</h4>Exploring the World of Elements<h4>Project Description</h4>The world we live in is made of the elements that the periodic table of elements contains. From the oxygen that we breathe in and the food we eat to the technology we use on a daily basis, elements are essential to our existence. But do you know about the different elements that exist in our world and how they were discovered? This project will give you the opportunity to learn about different elements from the periodic table, how they were discovered and the impact they have on our lives.<h4>Project Outline</h4>— Each group must consist of 3— 5 students<br/>— Each student from the group must choose one element from the periodic table to research<br/>— Groups must research the history, discovery, uses, and properties of their chosen element<br/>— Each group must create a 5— 7 minute presentation on their findings. Presentations must be creative, informative and contain at least 2 real world examples of how each student's element has impacted the world.<h4>Materials needed</h4>— Periodic table<br/>— Internet access<br/>— Books or other resources on the periodic table<h4>Objectives</h4>— To learn about the different elements in the periodic table<br/>— To learn about the history and discovery of different elements<br/>— To learn about the different uses and properties of different elements<br/>— To be able to identify and research different elements in the periodic table<br/>— To be able to understand and explain the different uses and properties of different elements in the context of the real world. ### Generate a research project for my 5th grade class. Topic: each student picking a state to research<h4>Project Name</h4>Project USA<h4>Project Description</h4>In this project, we will be learning about different states by researching the geography, population, major cities and other interesting facts about our assigned states. This project will help us expand our knowledge about the United States and give us all ideas about where we might want to visit or live when we are older!<h4>Project Outline</h4>— Each student must choose one U.S. state to research<br/>— Students must research the following topics about their chosen state:<br/>— Geography<br/>— Population<br/>— Major cities<br/>— Interesting facts <br/>— Each student must create a poster board decorated with art and objects that represent their state. Student will be required to present their poster boards to the class<br/>— Presentations must be creative and informative<br/>— Each poster board will be accompanies by a research paper about your state.<h4>Materials needed</h4>— Internet access<br/>— Books or other resources about U.S. states<br/>— poster board minimum size 18 in. x 24 in.<br/>— pens, pencils, paint, etc to decorate your board<br/>— Examples of what you might put on your poster board include a license plate from your state, a food item from your state, painting of the state flower, and more.<h4>Objectives</h4>— To be able to identify and research different states in the U.S.<br/>— To be able to understand and explain the different geographical, population, and city information about different states<br/>— To be able to give a presentation on the findings of their research ### Generate a research for my 9th grade AP human geography students Topic: colonization<h4>Project Name</h4>The Great Colonization<h4>Project Description</h4>The European colonization of other countries is a fascinating and complex historical event. This project will allow you to learn about a different European country that colonized another country. You will research the reasons for colonization, methods of colonization, and impacts of colonization on both the colonizing country and the indigenous people. You will then create a PowerPoint presentation to share your research with the class.<h4>Project Outline</h4>— Each student must choose one European country that colonized another country<br/>— Students must research the following topics about their chosen country and its colonization:<br/>— Reason for colonization<br/>— Method of colonization<br/>— Impact of colonization on indigenous people<br/>— Impact of colonization on the colonizing country<br/>— Each student must create a power point presentation that covers the everything in the project outline<br/>— Presentations must be engaging and educational<h4>Materials needed</h4>— Internet access<br/>— Microsoft PowerPoint or Google Slides<br/>— Books or other resources about European colonization<h4>Objectives</h4>— To be able to identify and research different European countries that colonized other countries<br/>— To be able to understand and explain the different reasons, methods, and impacts of colonization<br/>— To learn more about whether or not colonization is actively happening in the world today<br/>— To learn about the impact of colonization on the indigenous people and the colonizing country ### Generate a research project for my 12th grade economics class Topic: macroeconomics<h4>Project Name</h4> A World of Economies<h4>Project Description</h4>This project will help our class understand the macroeconomics of different countries. This project will allow the class to learn about different economies and governments around the world. After completing this project, students will be able to identify the economies of different countries, understand different economic situations and policies, and explain the different economies of different countries through their research.<h4>Project Outline</h4>— Each student must choose one country<br/>— Students must research the following topics about their chosen country:<br/>— Economic history<br/>— Current economic situation<br/>— Macroeconomic policies<br/>— Each student must write a research paper about their findings and give a presentation to the class<br/>— Presentations must be clear and concise<h4>Materials needed</h4>— Internet access<br/>— Books or other resources about the chosen country’s economic history and current economic situation<h4>Objectives</h4>— To learn about the different macroeconomic policies of different countries<br/>— To be able to identify different countries’ economies<br/>— To learn about how different macroeconomic policies have effected different countries<br/>— To learn about the different current economic situations of different countries<br/>— To be able to understand and explain the different economic histories, current economic situations, and macroeconomic policies of different countries ### Generate a research project for my 6th grade class Topic: ancient Egypt, writing a research paper and building a pyramid using poster board (or other easily available material)<h4>Project Name</h4> Pyramids, Pharaohs, and Foes<h4>Project Description</h4>Research and make a pyramid! That's right, you will be researching one of the most famous and successful ancient civilizations, that of ancient Egypt. We will be concentrating on the most famous aspect of this civilization: its Pharaohs. You will choose one Pharaoh and research all about his life, reign, and accomplishments. After you have gathered all the information you need on your chosen Pharaoh, you will write a research paper about your Pharaoh. Along with this research paper, you will also be making a pyramid to go along with your research paper. You will present your research and your pyramid to the class.<h4>Project Outline</h4>— Each student must choose one Pharaoh<br/>— Students must research the following topics about their chosen Pharaoh:<br/>— Life<br/>— Reign<br/>— Accomplishments<br/>— After students have completed their research, they will write a research paper about the Pharaoh they choose. The paper should be 2— 3 pages long.<br/>— Students will then use poster board (or other easily available material) to build a pyramid. The pyramid will be turned in along with the research paper.<br/>— pyramids will be presented to the class<h4>Materials needed</h4>— Poster board or other inexpensive material to construct pyramid walls<br/>— Something to decorate your pyramid with such as spray pain, paint, clay, or sand.<br/>— Decorations for the inner levels of the Pyramid (levels built into the pyramid to make it more realistic)<br/>— Figurines, fake plants, etc to decorate the outside of the pyramid<br/>— Whatever you can think of that would make your project stand out<br/>— Get creative!<h4>Objectives</h4>— To be able to identify and research different Pharaohs<br/>— To be able to understand and explain the different aspects of a Pharaoh’s life, reign, and accomplishments<br/>— To be able to write a research paper about their findings<br/>— To be able to build a pyramid out of poster board (or other easily available material) ### Generate a research project with a project outline, materials needed, objectives, and goals for my 8th grade history class. The project should be related to feudalism during the middle ages<h4>Project Name</h4> Lords, Ladies, and Peasants: Feudalism during the Middle Ages<h4>Project Description</h4>In this project, students will learn about feudalism, a political and social system that was used in Europe during the middle ages.Students will choose a European country and research the feudal system in their chosen country, including how the system worked, what the benefits and drawbacks of the system were, and how the system impacted the lives of the people living under it.<h4>Project Outline</h4>— Each student must choose one European country that practiced feudalism during the middle ages<br/>— Students must research the following topics about their chosen country and its feudal system:<br/>— How did the feudal system work?<br/>— What were the benefits and drawbacks of the feudal system?<br/>— How did the feudal system impact the lives of the people living under it?<br/>— Each student must write a research paper about their findings<h4>Materials needed</h4>— Laptops, books, iPads, or any other devices or materials needed for research<h4>Objectives</h4>— To learn about the different feudal systems in European countries during the middle ages<br/>— To learn about how the feudal system worked, the benefits and drawbacks of the system, and how it impacted the lives of those living under it ### Generate a research project for my 10th grade Spanish class Topic: each student bringing in a dish that has cultural significance. Each student should write a paper and turn it in on the day everyone brings in their dishes<h4>Project Name</h4>What's Cooking?<h4>Project Description</h4>This is a project that helps students learn about different cultures and their rich histories while also learning how to write a research paper. Students will be required to make a dish from another culture, research the cultural significance of that dish and write a paper about their findings and bring the dish to class on the day the project is due.<h4>Project Outline</h4>— Each student must choose one dish that has cultural significance in a Spanish speaking country<br/>— Students must research the following topics about their chosen dish:<br/>— What country does the dish come from?<br/>— What is the history of the dish?<br/>— What are the ingredients in the dish?<br/>— How is the dish made?<br/>— What are the cultural significance of the dish?<br/>— Each student must write a paper about their findings and bring their dish to class on the day the project is due<h4>Materials needed</h4>— Computer with Internet Access<br/>— Ingredients for chosen dish<br/>— Cooking utensils to serve dish on presentation day<h4>Objectives</h4>— To learn about different dishes from different cultures<br/>— to understand that some of the foods we eat all the time come from deep traditional roots<br/>— To learn about the history, ingredients, and cultural significance of different dishes<br/>— To be able to make a dish from another culture and explain the cultural significance of the dish ### Generate a research project for my 5th grade class Topic: creating a collage of their family<h4>Project Name</h4>Collages of Our Families<h4>Project Description</h4>For this project, students will be tasked with creating a collage of their family using any materials they choose. The collage should be creative and should represent the student’s family in some way. Each student will then present their collage to the class and explain why they chose the materials they used and what the collage represents about their family. The project will be a great way for students to get to know one another and learn about different families.<h4>Project Outline</h4>— Each student will create a collage of their family.<br/>— The collage can be created using any materials the student wants.<br/>— The collage should be creative and should represent the student’s family in some way.<br/>— Each collage will be cardstock paper no less than 11 x 17 inches<br/>— Each student will present their collage to the class and explain why they chose the materials they used and what the collage represents about their family.<h4>Materials needed</h4>— White or colored Cardstock (Minimum 11 x 17 inches)<br/>— Scissors<br/>— Glue<br/>— Markers/Paint<br/>— Photos<br/>— Buttons<br/>— Other creative items that represent your family!<h4>Objectives</h4>— To learn about different families and what makes them unique. Also a great chance for students to learn more and connect with other students based on similarities that did not previously know about!<br/>— To learn about different materials that can be used to create a collage<br/>— To be able to explain what the collage represents about their family<br/>— To be creative in the design of their collage ### Generate a research project for my ${gradeLevel} students Topic: ${subject}`,
        temperature: 0.85,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0,
        stop: [' ###'],
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
    fetchApi(subject);
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
              <h4>Research Project Generator 📚</h4>
              <FormRow
                type="text"
                labelText="Subject, unit, or lesson to generate project for:"
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
                {isLoading ? 'Please Wait...' : 'Generate Project Idea'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>
              Save time and quickly spin up research projects for any grade
              level, subject, unit, lesson, or general topic.
            </h5>
            <p>
              ✅ Generates projects in stunning detail.
              <br /> ✅ If you provide a detailed prompt, the project generated
              will stick closely to what you've provided. If you're feeling
              lucky, be brief!
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

export default ResearchProjectGenerator;
