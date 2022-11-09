import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const ParentEmails = () => {
  const { displayAlert, isLoading } = useAppContext();

  const [completion, setCompletion] = useState('');
  const [firstFeedback, setFirstFeedback] = useState('');
  const [secondFeedback, setSecondFeedback] = useState('');
  const [thirdFeedback, setThirdFeedback] = useState('');
  const [fourthFeedback, setFourthFeedback] = useState('');
  const [text, setText] = useState('');

  async function fetchApi(
    firstFeedback,
    secondFeedback,
    thirdFeedback,
    fourthFeedback
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
        prompt: `Feedback: does great on homework, has a B+ in the class currently, late to class 1-2 times per week\n\nDear Parent/Guardian,<br/><br/>I wanted to take a moment to let you know how your child is doing in my class. The great news is that they always have their homework completed and generally does well on classwork and tests. However, I have noticed that they are late to class 1-2 times per week. <br/><br/>I wanted to make you aware of this as it can disrupt the class when we are in the middle of instructional time. Overall, your child is doing great in my class! They currently have a B+ and are on the right track. <br/><br/>Thank you for your time and if you have any questions, please do not hesitate to reach out.<br/><br/>Sincerely, <br/>[Teacher's Name]\n ###\n Feedback: did an amazing job on their ancient egypt research report, very bright student\n\nDear Parent/Guardian,<br/><br/>I wanted to let you know that your child did an amazing job on their ancient egypt research report. The report was very well-researched and showed a lot of effort. I was very impressed with their work!<br/><br/>It is always a pleasure to have bright students like your child in my class. I am confident that they will continue to do great things!<br/><br/>Thank you for your time and if you have any questions, please do not hesitate to reach out.<br/><br/>Sincerely,<br/>[Teacher's Name]\n ###\n Feedback: just needs to apply themselves, shows obvious signs of being extremely intelligent, only reason for failing (current grade is a D-) is because they do not turn in homework or projects. I told them that they can turn in any missing projects or assignment for almost full credit\n\nDear Parent/Guardian,<br/><br/>This email concerns your child's progress in my class. I am sorry to say that they right on the edge of failing,  currently with a D- in the class. The only reason why their grade is so low is because they do not turn in homework assignments or projects.<br/><br/>I have told your child that they can turn in any missing projects or assignments for almost full credit. However, they need to apply themselves to make up missing work and start turning in work on time. They show obvious signs of being extremely intelligent and I know that they are capable of doing great things.<br/><br/>I hope you can talk to them about this issue and help them get back on track. If you have any questions, please do not hesitate to reach out.<br/><br/>Sincerely,<br/>[Teacher's Name]\n ###\n Feedback: does great on projects and tests, doesn't show up to class from time to time, understands concepts\n\nDear Parent/Guardian,<br/><br/>I hope all is well! I just wanted to touch base with you about your child's progress in my class. They are doing great on projects and tests which is keeping their grade up, however they don't always show up to class.<br/><br/>I understand that things come up, but it is important for your child to be in class as they might miss important information or fall behind. I have noticed that when they are in class, they understand the concepts<br/><br/>If you could talk to them about the importance of attendance, that would be great. Thank you for your time!<br/><br/>Sincerely,<br/>[Teacher's Name]\n ###\n Feedback: is an enthusiastic learner who seems to enjoy school, exhibits a positive outlook and attitude in the classroom, works great in groups\n\nDear Parent/Guardian,<br/><br/>Your child is doing great in my class! They are such a joy to have and they always seem to enjoy school. They have a great attitude in the classroom and their energy is contagious.<br/><br/>I've also noticed that they work great in groups. They are always willing to help other students and they make sure that everyone is on the same page. It's great to see such a positive outlook in a student!<br/><br/>Overall, your child is doing great in my class. Keep up the good work!<br/><br/>Sincerely,<br/>[Teacher's Name]\n ###\n Feedback: tackles classroom assignments, tasks, and group work in an organized manner, consistently completes homework assignments.\n\nDear Parent/Guardian,<br/><br/>I just wanted to let you know how much I appreciate your child's organizational skills in my class. They always have their materials ready and they tackle classroom assignments, tasks, and group work in a very organized manner. <br/><br/>Additionally, they always complete their homework assignments, which shows they have great consistency. A rare characteristic at this age!<br/><br/>It is a pleasure to have such a responsible and hardworking student in my class. Keep up the great work!<br/><br/>Sincerely,<br/>[Teacher's Name]\n ###\n Feedback: has incredible self-discipline and always gets his/her work done in a timely manner, seeks responsibilities and follows through, doesn't come in to class from time to time, but overall is not a problem.\n\nDear Parent/Guardian,<br/><br/>I just wanted to let you know that your child is doing great in my class! They have incredible self-discipline and always get their work done on time. <br/><br/>They also seek out responsibilities in the classroom which really helps me, and whenever they say they are going to do something - they follow through on it.<br/><br/>I have noticed that they don't come in to class from time to time, but overall it is not a problem. I just wanted to make you aware in case you need to talk to them about attendance.<br/><br/>Overall, your child is doing great in my class! Keep up the work on your end!<br/><br/>Sincerely,<br/>[Teacher's Name]\n ###\n Feedback: does great on tests, loves to help out in the classroom, great student.\n\nDear Parent/Guardian,<br/><br/>I hope all is well! I just wanted to let you know how great your child is doing in my class. I'm assuming they must spend a lot of time studying or are either extremely gifted, because they always do great on tests and they love to help out in the classroom.<br/><br/>It's been a pleasure to have such a great student in my class so far this year! Keep up the good work!<br/><br/>Sincerely,<br/>[Teacher's Name]\n ###\n Feedback: did an amazing job on their project about brain drain, does great on homework and tests, all around a pleasure to have in my class.\n\nDear Parent/Guardian,<br/><br/>I just wanted to let you know how much I enjoyed your child's project about brain drain. It was very well researched and put together. Additionally, they always do great on homework and tests.<br/><br/>It is a pleasure to have such a smart and responsible student in my class. Thank you for raising such a great child!<br/><br/>Sincerely,<br/>[Teacher's Name] ###\n Feedback: does good on homework, b+, great writer, late to class from time to time\n\nDear Parent/Guardian,<br/><br/>I wanted to take a moment to let you know how your child is doing in my class. The great news is that they always have their homework completed and generally does well on classwork and tests. However, I have noticed that they are late to class from time to time.<br/><br/>I wanted to make you aware of this as it can disrupt the class when we are in the middle of instructional time. Overall, your child is doing great in my class! They currently have a B+ and are on the right track.<br/><br/>On a side note, I've also noticed that they are a phenomenal writer! Their essays are always so well-written and display a deep understanding of the material.<br/><br/>Thank you for your time and if you have any questions, please do not hesitate to reach out.<br/><br/>Sincerely,<br/>[Teacher's Name] ###\n Feedback: ${firstFeedback}, ${secondFeedback}, ${thirdFeedback}, ${fourthFeedback}\n\n`,
        temperature: 0.8,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.6,
        presence_penalty: 0.1,
        stop: [' ###'],
      }),
    });
    const json = await response.json();
    setCompletion(json.choices[0].text);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (!firstFeedback) {
      displayAlert();
      return;
    }
    fetchApi(firstFeedback, secondFeedback, thirdFeedback, fourthFeedback);
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
              <h4>Parent-Teacher Email Composer 🎉</h4>
              <FormRow
                type="text"
                labelText="First feedback to address:"
                name="firstFeedback"
                value={firstFeedback}
                handleChange={e => setFirstFeedback(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Second feedback to address:"
                name="secondFeedback"
                value={secondFeedback}
                handleChange={e => setSecondFeedback(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Third feedback to address:"
                name="thirdFeedback"
                value={thirdFeedback}
                handleChange={e => setThirdFeedback(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="Fourth feedback to address:"
                name="fourthFeedback"
                value={fourthFeedback}
                handleChange={e => setFourthFeedback(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Email'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>Generate an email to send out to a student's parent.</h5>
            <p>
              ✅ The more detailed the better.
              <br />
              ✅ Can easily detect between positive and negative feedback. Feel
              free to include both, or just one.
              <br />
              ✅ Simply click 'Generate Email' again if you don't like the first
              one!
              <br />✅ Simply click 'Generate Email' again if you don't like the
              first one!
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

export default ParentEmails;
