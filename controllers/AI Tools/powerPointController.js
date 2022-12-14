// const { Configuration, OpenAIApi } = import ('openai');
import { Configuration, OpenAIApi } from 'openai';
import retry from 'async-retry';

const powerPointCompletion = async (req, res) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { subject, gradeLevel } = req.body;
    console.log('req param', req.body, subject, gradeLevel);
    const openai = new OpenAIApi(configuration);
    const response = await retry(
      async () => {
        try {
          return await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Create a 15 slide powerpoint for my project about University of Massachusetts Amherst \n\nThe Powerpoint should have 15 slides and cover an introduction of the school, the mascot, acceptance rate, average gpa, what majors are most popular, etc. Include information I have not listed. <header1>Introduction to University of Massachusetts Amherst<header1> <body1>University of Massachusetts Amherst is a public research university located in Amherst, Massachusetts. It is the flagship campus of the University of Massachusetts system. It is the third largest campus in the United States and the largest university in New England.<body1> <points1>Talking points:\n- Flagship campus of the University of Massachusetts system\n- Third largest campus in the United States\n- Largest university in New England<points1> <header2>Mascot<header2> <body2>The mascot of University of Massachusetts Amherst is Sam the Minuteman. He is dressed in colonial clothing and carries a musket to represent the school's Revolutionary War history. He was first introduced in 1972 and has been the school mascot ever since.<body2> <points2>Talking points: \n- Sam the Minuteman\n- Dressed in colonial clothing\n- Carries a musket\n- Represent school’s Revolutionary War history<points2> <header3>Acceptance Rate<header3> <body3>The acceptance rate of University of Massachusetts Amherst is 58%. This means that out of every 100 applicants, 58 will be accepted. The university is highly competitive, so students must have a strong academic record and test scores to be accepted.<body3> <points3>Talking points: \n- 58% acceptance rate\n- Highly competitive\n- Strong academic record and test scores required<points3> <header4>Average GPA<header4> <body4>The average GPA of accepted students at University of Massachusetts Amherst is 3.5. This means that most students accepted have a GPA of 3.5 or higher. This is a good indication of the academic rigor of the university and its commitment to providing a quality education.<body4> <points4>Talking points: \n- Average GPA of 3.5\n- Most students accepted have a GPA of 3.5 or higher\n- Indication of academic rigor<points4> <header5>Undergraduate Majors<header5> <body5>University of Massachusetts Amherst offers over 100 undergraduate majors. Some of the most popular majors include: Business Administration, Psychology, Biology, Economics, Nursing, Political Science, and Computer Science.<body5> <points5>Talking points: \n- Over 100 undergraduate majors\n- Popular majors: Business Administration, Psychology, Biology, Economics, Nursing, Political Science, Computer Science<points5> <header6>Student Demographics<header6> <body6>University of Massachusetts Amherst is home to over 30,000 students from all 50 states and over 100 countries. The student body is diverse, with 25% of students identifying as students of color and 9% of students identifying as international students.<body6> <header7>Tuition & Fees<header7> <body7>The tuition and fees for University of Massachusetts Amherst varies depending on the student's residency status. For in-state students, tuition and fees are estimated to be around $15,000 per year. For out-of-state students, tuition and fees are estimated to be around $33,000 per year.<body7> <header8>Campus Life<header8> <body8>University of Massachusetts Amherst has a vibrant campus life, with over 350 student organizations, athletic teams, and clubs. There are also a wide variety of cultural activities, events, and performances on campus for students to take part in.<body8> <header9>Student Housing<header9> <body9>University of Massachusetts Amherst offers a variety of housing options for students. On campus, there are residence halls, apartments, and suite-style living. Off campus, there are university-affiliated housing as well as private apartments and homes available for rent.<body9> <header10>Academic Support<header10> <body10>University of Massachusetts Amherst provides a variety of academic support services to its students. These services include individual tutoring, writing support, academic coaching, and disability services. The university also offers a range of online resources for students to use.<body10> <header11>Athletics<header11> <body11>University of Massachusetts Amherst has a strong athletics program, with over 20 Division I teams competing in the NCAA. The school is a member of the Atlantic 10 Conference and is home to the Minutemen and Minutewomen teams. The school also has a wide variety of intramural and club sports available for students to join.<body11> <header12>Notable Alumni<header12> <body12>University of Massachusetts Amherst has produced many notable alumni, including Pulitzer Prize-winning author Junot Diaz, former Massachusetts Governor Deval Patrick, and former Secretary of State John Kerry. Other notable alumni include actor John Krasinski, filmmaker John Waters, and businessman Jack Welch.<body12> <header13>Rankings<header13> <body13>University of Massachusetts Amherst is ranked #1 in public universities in New England by U.S. News & World Report. The university is also consistently ranked among the top 100 public universities in the United States. It is also ranked among the top research universities in the world by Times Higher Education.<body13> <header14>Campus Size<header14> <body14>University of Massachusetts Amherst is located on 1,450 acres of land in the Pioneer Valley. The campus consists of over 200 buildings, including academic buildings, residence halls, and athletic facilities. The campus also features a variety of outdoor spaces and gardens, as well as a arboretum and nature center.<body14> <header15>Summary<header15> <body15>University of Massachusetts Amherst is a public research university located in Amherst, Massachusetts. It is the flagship campus of the University of Massachusetts system, and it is the third largest campus in the United States. The school has a 58% acceptance rate, an average GPA of 3.5, and offers over 100 undergraduate majors. It is also ranked #1 in public universities in New England by U.S. News & World Report.<body15> ### Create a 15 slide educational powerpoint for my lesson about ${subject}. \n\n The Powerpoint should have 15 slides and cover ${gradeLevel}. Include information I have not listed.`,
            temperature: 0.8,
            max_tokens: 2400,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: [' ###'],
          });
        } catch (err) {
          console.error(err);
          bail(err);
        }
      },
      {
        retries: 5,
        onRetry: (err, attemptNumber) => {
          console.log(
            `Retrying due to error: ${err.message}. Attempt number: ${attemptNumber}`
          );
        },
      }
    );
    console.log('openai res ===', response.data);
    res.send(response.data);
  } catch (err) {
    console.log('openai res err ===', err);
    return err;
  }
};

export { powerPointCompletion };
