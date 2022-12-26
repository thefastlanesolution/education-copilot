// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';

const unitOverviewCompletion = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { unitName, unitLength, unitStandards, unitDetails } = req.body;
  console.log(
    'req param',
    req.body,
    unitName,
    unitLength,
    unitStandards,
    unitDetails
  );
  const openai = new OpenAIApi(configuration);
  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: `Unit Name: Ancient Egypt\n\nUnit Details: Daily life in ancient egypt\n\nStandards: Students analyze the geographic, political, economic, religious, and social structures of the early civilizations of Mesopotamia, Egypt, and Kush. \n\n1. Locate and describe the major river systems and discuss the physical settings that supported permanent settlement and early civilizations. \n2. Trace the development of agricultural techniques that permitted the production of economic surplus and the emergence of cities as centers of culture and power. \n3. Understand the relationship between religion and the social and political order in Mesopotamia and Egypt. \n4. Know the significance of Hammurabi’s Code. \n5. Discuss the main features of Egyptian art and architecture. \n6. Describe the role of Egyptian trade in the eastern Mediterranean and Nile valley.\n7. Understand the significance of Queen Hatshepsut and Ramses the Great. \n8. Identify the location of the Kush civilization and describe its political, commercial, and cultural relations with Egypt. \n9. Trace the evolution of language and its written forms.\n\nUnit Length: 10 days\n\nTask: Create a 10 day unit plan that teaches about the unit details and standards. \n\nUnit Plan:\n\n<title1>Day 1: Introduction to Ancient Egypt</title1>\n<day1>- Introduce the unit and discuss the geographic, political, economic, religious, and social structures of ancient Egypt.\n- Discuss physical settings that supported permanent settlement and early civilizations.\n- Introduce the major river systems and how they helped shape ancient Egyptian life. (such as the Nile) </day1>\n\n<title2>Day 2: Agriculture and the Production of Economic Surplus</title2>\n<day2>- Discuss the development of agricultural techniques that allowed for the production of economic surplus and the emergence of cities as centers of culture and power. (such as harvesting, irrigation, etc.)\n- Introduce the concept of irrigation and its role in ancient Egyptian agriculture.\n- Introduce the significant cities that  developed based on economic surplus (e.g. Memphis, Thebes).\n- Discuss the role of the Nile in agriculture and the emergence of cities.</day2>\n\n<title3>Day 3: Religion and the Social and Political Order</title3>\n<day3>- Discuss the relationship between religion and the social and political order in ancient Egypt.\n- Introduce the concept of polytheism and the most popular gods and goddesses of the Egyptian pantheon.\n- Explain the role of the Pharaoh in both the religious and political spheres and the concept of divine right.</day3>\n\n<title4>Day 4: Hammurabi\'s Code</title4>\n<day4>- Introduce the concept of Hammurabi\'s Code and its significance in Ancient Egypt.\n- Discuss the major principles of Hammurabi\'s Code and how it impacted Ancient Egyptian society. (one example is the idea of "an eye for an eye")\n- Discuss the implications of the Code for justice, economics, and other aspects of everyday life.</day4>\n\n<title5>Day 5: Egyptian Art and Architecture</title5>\n<day5>- Discuss the main features of Egyptian art and architecture.\n- Introduce the concept of the "canon of proportions" and discuss its significance in Egyptian art.\n- Discuss the major structures of ancient Egypt (e.g. pyramids, temples, etc.)\n- Introduce the concept of hieroglyphs and discuss how they were used in art and architecture.</day5>\n\n<title6>Day 6: Egyptian Trade</title6>\n<day6>- Discuss the role of Egyptian trade in the eastern Mediterranean and Nile Valley.\n- Introduce the concept of barter and how it was used in Egyptian trade. (e.g. Someone might trade grain for tools)\n- Discuss the major trading partners of ancient Egypt (e.g. Greece, Rome, Canaan).\n- Discuss the major goods that were traded by ancient Egypt. (e.g. grain, papyrus, jewelry, etc)</day6>\n\n<title7>Day 7: Queen Hatshepsut and Ramses the Great</title7>\n<day7>- Discuss the legacy of Queen Hatshepsut and Ramses the Great.\n- Introduce the concept of the New Kingdom and its significance in Egyptian history.\n- Discuss the accomplishments of Queen Hatshepsut and Ramses the Great and their impact on ancient Egyptian culture. (Some achievements include building monuments, expanding trade networks, etc)</day7> \n\n<title8>Day 8: The Kush Civilization</title8>\n<day8>- Introduce the location of the Kush civilization and describe its political, commercial, and cultural relations with Egypt.\n- Discuss the major cities of Kush (e.g. Meroe, Napata) and their significance in ancient Egyptian society.\n- Discuss the major trade goods exchanged between Kush and Egypt.</day8>\n\n<title9>Day 9: Evolution of Language and Writing</title9>\n<day9>- Trace the evolution of language and its written forms.\n- Introduce the concept of hieroglyphics and discuss its significance in ancient Egyptian culture.\n- Discuss the major principles of hieroglyphics and how they are used.\n- Introduce the concept of demotic script and discuss its significance in ancient Egyptian culture.</day9>\n\n<title10>Day 10: Summary and Review</title10>\n<day10>- Review and summarize the major points of the unit.\n- Discuss the geographic, political, economic, religious, and social structures of ancient Egypt.\n- Review the major river systems, agricultural techniques, religion, code of Hammurabi, art and architecture, trade, Queen Hatshepsut and Ramses the Great, the Kush civilization, and the evolution of language and writing.</day10>\n\n ### \n\nUnit Name: ${unitName}\n\nUnit Details: ${unitDetails}\n\nStandards: ${unitStandards}\n\nUnit Length: ${unitLength} days\n\nTask: Create a ${unitLength} day unit plan that teaches about the unit details.\n\nUnit Plan:`,
      temperature: 0.75,
      max_tokens: 2200,
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

export { unitOverviewCompletion };
