// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const lessonPlannerV2Completion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { subject, gradeLevel, overviewText } = req.body;
  console.log('req param', req.body);
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Create a unique and detailed lesson plan following a specific structure about Ecosystems for a 9th grade biology class. Lesson Plan: Ecosystems. Lesson Aim <aim>Students will learn about the different types of ecosystems and the biomes that they are found in.<aim> Student Objectives & Goals <objectives>1. Students will be able to identify and describe the different types of ecosystems, including their components and biodiversity. \n2. Students will be able to explain how an ecosystem can be affected by a natural disaster or a human-caused event. \n3. Students will be able to explain how an ecosystem can be resilient and return to its normal state after a disaster. \n4. Student will be able to describe the different roles of producers, consumers, and decomposers in an ecosystem.<objectives> Possible Materials Needed <materials>1. Textbook or educational handouts on ecosystems \n2. Pictures of different ecosystems (taiga, tundra, desert, etc.) \n3. Ecosystem Vocabulary Sheet \n4. Ecosystems Powerpoint Presentation \n5. Short video on ecosystems <materials> Anticipatory Set <anticipatory>1. Begin the lesson by engaging the class in a discussion on the different components of an ecosystem. Ask the class to brainstorm what they might find in a forest ecosystem, a desert ecosystem, or a grassland ecosystem. Discuss some of the key components that are found in all ecosystems, such as a food web, water cycle, and sunlight. Then, ask the class to consider how the various components interact with each other to create a functioning ecosystem. \n\n2. Introduce the concept of biodiversity and how it is essential to the stability of an ecosystem. Ask the class to consider how the different species interact with each other and how human activities can affect biodiversity. Explain that when one species is removed from an ecosystem, it can have a ripple effect on the rest of the species in the ecosystem. \n\ns3. Lastly, ask the class to consider how an ecosystem might respond to a natural disaster or a human-caused event. Discuss the concept of resilience and how it can help an ecosystem to recover and return to its normal state. Ask the class to consider how an ecosystem might respond differently to different disasters and how species might be affected.<anticipatory> Modeled Practice Ideas <modeled>1. The teacher can provide an example of an ecosystem and describe the different components that make up that ecosystem. For example, the teacher could talk about a forest ecosystem and how it is made up of trees, animals, insects, etc. And how each of these different species play a role in the ecosystem such as producers, consumers, and decomposers. The teacher can then ask the class to identify the different parts of the ecosystem and how they interact with each other. 2. The teacher can provide a hands-on activity to help the students understand the concept of biodiversity and its importance in an ecosystem. The teacher can pass out index cards to the students and ask them to draw a picture of their own ecosystem on the card. The teacher can then ask the students to identify the different species in their ecosystem and how they interact with each other. The teacher can then ask the students to explain how the removal of one species might affect the rest of the species in the ecosystem. 3. The teacher can provide a discussion-based activity to help the students understand the concept of resilience and how it helps an ecosystem to return to its normal state after a disaster. The teacher can ask the class to consider a natural disaster such as a hurricane and discuss how the different species in an ecosystem might be affected and how the ecosystem might respond to the disaster. The teacher can also ask the class to consider how the ecosystem might be resilient and how it could eventually recover from the disaster.<modeled> Guided Practice Ideas <guided>1. Divide the class into small groups and have each group create an ecosystem out of construction paper, markers, and other craft materials. Each group should create an ecosystem with a mix of producers, consumers, and decomposers. Ask each group to explain the role of each organism in the ecosystem and how they interact with each other. Once the groups are finished creating their ecosystems, have them present their projects to the class and discuss how the different components interact with each other. \n\n2. Divide students into small groups and assign each group a natural disaster (hurricane, tornado, fire, etc.). Ask each group to create a role-play that demonstrates how the different species in an ecosystem might be affected by the natural disaster. Allow each group to present their role-play to the class and discuss how the different species might respond differently to the disaster and how the ecosystem might be resilient and return to its normal state. \n\n3. Provide students with a worksheet that asks them to consider how a natural disaster or human-caused event might affect an ecosystem. Ask them to research how different species might be affected by the particular disaster or event and how long it might take for the ecosystem to recover. Ask them to consider how an ecosystem can be resilient and return to its normal state after a disaster and what role humans might play in helping with this process.<guided> Independent Practice Ideas <independent>1. Ask students to research one particular type of ecosystem and create a poster that includes information about the components, biodiversity, and potential effects of a disaster or human-caused event. Students should also include a discussion of the roles of producers, consumers, and decomposers in the ecosystem. \n\n2. Ask students to write a story about a natural disaster or human-caused event that impacts an ecosystem. The story should include how the different species in the ecosystem respond to the disaster and how the ecosystem is resilient and returns to its normal state. \n\n3. Ask students to create a PowerPoint presentation that explains how an ecosystem can be affected by a natural disaster or human-caused event. The presentation should include information on how different species might respond to the disaster and how the ecosystem can be resilient and return to its normal state. The presentation should also include information on the roles of producers, consumers, and decomposers in an ecosystem.<independent> Common Areas of Struggle <struggles>When it comes to learning about eco-systems, the most common struggle is understanding the different components of an ecosystem and how they interact. Students may also have difficulty understanding the concept of biodiversity and how it is essential to the stability of an ecosystem. Another area where students struggle to comprehend is how an ecosystem can be resilient and return to its normal state after a disaster.  \n\nEnsure that students are given plenty of opportunity to practice and discuss the different components of an ecosystem and how they interact with each other. Provide plenty of examples and visuals to help students better understand the concept. Encourage students to ask questions and engage in discussions about the different components of an ecosystem.<struggles> Closure/Assessment <closure>At the end of the lesson, the teacher can ask the class to complete a writing prompt that asks them to consider how an ecosystem might respond to a natural disaster or human-caused event. Ask the students to consider how different species might be affected and how the ecosystem might be resilient and return to its normal state. The teacher can also assign a quiz to assess the students' understanding of the concepts discussed in the lesson. It is important to provide students with feedback on their work so that they can understand what areas they need to focus on and improve.  \n\nBe sure to ask questions often related to the common areas of struggle.<closure> ### Create a unique and detailed lesson plan following a specific structure about ${subject} for a ${gradeLevel} class. Lesson Plan: ${subject} Lesson Aim`,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
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

export { lessonPlannerV2Completion };
