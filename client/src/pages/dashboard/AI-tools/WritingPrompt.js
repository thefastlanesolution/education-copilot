import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import FormRow from '../../../components/FormRow';
import CardContent from '@mui/material/CardContent';
import { useAppContext } from '../../../context/appContext';
import Wrapper from '../../../assets/wrappers/InputForm';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const WritingPrompt = () => {
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
        prompt: `Is Social Media Making Us More Narcissistic? Writing Prompt:<h2>Is Social Media Making Us More Narcissistic?</h2> Do you spend too much time trying to be attractive and interesting to others? Are you just a little too in love with your own Instagram feed?<br/><br/>As the generation who grew up with social media, a reflection on narcissism is of critical importance to teenagers. What are the psychological and ethical implications of constant engagement with or obsession over social media? How does it change our relationship with others and how we see ourselves?<br/><br/>My teenage son recently informed me that there is an Internet quiz to test oneself for narcissism. His friend had just taken it. “How did it turn out?” I asked. “He says he did great!” my son responded. “He got the maximum score!”<br/><br/>When I was a child, no one outside the mental health profession talked about narcissism; people were more concerned with inadequate self-esteem, which at the time was believed to lurk behind nearly every difficulty. Like so many excesses of the 1970s, the self-love cult spun out of control and is now rampaging through our culture like Godzilla through Tokyo.<br/><br/>This is a costly problem. While full-blown narcissists often report high levels of personal satisfaction, they create havoc and misery around them. There is overwhelming evidence linking narcissism with lower honesty and raised aggression. It’s notable for Valentine’s Day that narcissists struggle to stay committed to romantic partners, in no small part because they consider themselves superior.<br/><br/>The full-blown narcissist might reply, “So what?” But narcissism isn’t an either-or characteristic. It’s more of a set of progressive symptoms (like alcoholism) than an identifiable state (like diabetes). Millions of Americans exhibit symptoms, but still have a conscience and a hunger for moral improvement. At the very least, they really don’t want to be terrible people.<h4>Student Instructions</h4>— Do you recognize yourlf or your friends or family in any of the descriptions in this article? Are you sometimes too fixated on collecting “likes” and thinking about how others see you?<br/>— What’s the line between “healthy self-love” that “requires being fully alive at this moment, as opposed to being virtually alive while wondering what others think,” and unhealthy narcissism? How can you stay on the healthy side of the line?<br/>— Did you take the test? What did it tell you about yourself?<br/>— What about Instagram, Facebook, Snapchat and other social media feeds makes them so hard to put down?<br/>— Do you think this writer’s proposal of a “social media fast” is a viable way to combat narcissism?<br/>— For those who aren’t as attached to social media, do challenges from an overinflated sense of self still arise? If so, from where?<br/>— If everyone is becoming more narcissistic, does that make narcissism necessarily a bad thing? ### Are Small Schools More Effective Than Large Schools? Writing Prompt:<h2>Are small schools more effective than large schools?</h2>The education system in the United States is in a constant state of flux as policymakers, educators, and parents debate what is the best way to educate our nation's children. One of the most contentious issues in this debate is whether smaller schools or larger schools are more effective in providing a quality education.<br/><br/>Advocates of smaller schools argue that smaller schools are more intimate and allow for more personalized attention from teachers. They also argue that smaller schools provide a more supportive community for students and that students in smaller schools are more likely to be engaged in their education.<br/><br/>Advocates of larger schools argue that larger schools provide more opportunities for students to explore their interests and to take advantage of specialized programs. They also argue that larger schools provide more resources and that students in larger schools have more opportunities to interact with a diverse range of people. There is no easy answer to this question, as both small schools and large schools have their advantages and disadvantages. Ultimately, the decision of whether to attend a small school or a large school is a personal one that should be made based on the needs and preferences of the individual student<h4>Student Instructions</h4>— Do you think that smaller schools are more effective than large schools? Why or why not?<br/>— What are some of the advantages and disadvantages of both small schools and large schools?<br/>— What do you think is the most important factor to consider when choosing between a small school and a large school?<br/>— Have you ever attended a small school or a large school? If so, what was your experience like?<br/>— Do you think that the size of a school has any impact on the quality of education that a student receives? Why or why not? ### How Would Your Life Be Different if You Had Better Listening Skills? Writing Prompt:<h2>How would your life be different if you had better listening skills?</h2>Listening is a fundamental communication skill, yet many of us don't really know how to do it effectively. We often interrupt others when they are speaking, or we allow our minds to wander, or we focus more on what we are going to say next instead of truly listening to what the other person is saying. If we could all learn to listen more effectively, our lives would be transformed. We would be better communicators, better friends, better employees, better spouses, better students, better human beings.<br/><br/>One example of how better listening skills could improve our lives is in group activities. We have all had the experience of being a part of a group where everyone is talking but no one is really listening. People are either too busy thinking about what they are going to say next, or they are only half-listening while checking their news feed or text messages. But if everyone in the group could focus on listening to what others are saying, whatever the group was trying to accomplish would be much more productive. Ideas would be better communicated, conflicts would be resolved more quickly, and decisions would be made more efficiently.<br/><br/>Another example of how better listening skills could improve our lives is in our personal relationships. How many times have you had a conversation with your spouse or partner or friend where you can tell that they are not really listening to you? They are looking at their phone or watching TV or thinking about something else entirely. But if they were to focus on really listening to you, they would be more present in the conversation and you would feel more connected to them.<h4>Student Instructions</h4>— Do you consider yourself a good listener? Why or why not?<br/>— What are some of the reasons why it is important to be a good listener?<br/>— What are some of the ways in which better listening skills could improve your life?<br/>— What do you think are some of the biggest obstacles to being a good listener?<br/>— What are some of the things you can do to become a better listener? ### ${subject} Writing Prompt:`,
        temperature: 0.8,
        max_tokens: 700,
        top_p: 1,
        frequency_penalty: 0.2,
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
              <h4>Writing Prompt Generator 📝</h4>
              <FormRow
                type="text"
                labelText="Topic/Prompt:"
                name="subject"
                value={subject}
                handleChange={e => setSubject(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please Wait...' : 'Generate Writing Prompt'}
              </button>
            </div>
          </form>
          <div className="bodyText">
            <h5>Generate long form writing prompts with ease.</h5>
            <p>
              ✅ Currently, it's best to phrase your topic/prompt in the form of
              a question. Although, may still get great results using single
              words or statements.
              <br />✅ The goal of this tool is to create a long form writing
              prompt that promotes critical and analytical thinking.
              <br />
              <br />
              <h4>Examples 🥳</h4>
              <ol>- Do you believe zoos should exist?</ol>
              <ol>- Should schools have a dress code?</ol>
              <ol>- Are small schools more effective than large schools?</ol>
              <ol>- Should celebrating international holidays be mandatory?</ol>
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

export default WritingPrompt;
