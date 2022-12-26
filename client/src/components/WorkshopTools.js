import Student from './Tool';
import Wrapper from '../assets/wrappers/WorkshopTools';
import { ImMagicWand } from 'react-icons/im';
import { ImPlus } from 'react-icons/im';
import './WorkshopTools.css';

const JobsContainer = () => {
  return (
    <div className="workshop">
      <div className="pageheader">
        <div>{<ImMagicWand className="historyicon" />} Workshop Tools</div>
        <a target="_blank" href="https://educationcopilot.com/requests/">
          <div className="request">
            {<ImPlus className="historyicon plusicon" />} Request a New Tool
          </div>
        </a>
      </div>
      <Wrapper>
        <h5>Made with Love 💜</h5>
        <div className="jobs">
          {/* recipe-builder */}
          <Student
            key={'recipebuilder'}
            emoji="⚡"
            firstName="Recipe Builder"
            lastName="recipe-builder"
            studentEmail="Combine all of the best tools into one creation. Generate a lesson plan, PowerPoint, and more - all at once."
          />
          {/* lesson-planner */}
          <Student
            key={'Lesson Planner'}
            emoji="📝"
            firstName="Lesson Planner"
            lastName="lessonplannerv2"
            studentEmail="Save time and energy by creating a detailed lesson plan with the help of Copilot. Never stare at a blank paper again."
          />
          {/* educational-handout */}
          <Student
            key={'Educational Handouts'}
            emoji="🧠"
            firstName="Educational Handout"
            lastName="educational-handout"
            studentEmail="Create a detailed and structured handout to prepare yourself or students for a lesson. This tool goes great paired with the Lesson Planner!"
          />
          {/* powerpoints */}
          <Student
            key={'PowerPoint Presentations'}
            emoji="📊"
            firstName="PowerPoint Generator"
            lastName="powerpoints"
            studentEmail="Generate a 15 slide, educational PowerPoint on any topic. Simply provide a few details and let Copilot do the rest!"
          />
          {/* context-builder */}
          <Student
            key={'Context Builders'}
            emoji="📚"
            firstName="Context Builder"
            lastName="context-builder"
            studentEmail="Scaffold your lesson with a context builder. This tool will ensure your students don't miss a beat when building their understanding about a topic."
          />
          {/* idea-generator */}
          <Student
            key={'Idea Generator'}
            emoji="💡"
            firstName="Idea Generator"
            lastName="idea-generator"
            studentEmail="Generate a list of ideas for a lesson, project, or anything else you can think of. This tool is great for brainstorming activity or lesson ideas!"
          />
          {/* ai-freestyle */}
          <Student
            key={'freestyle'}
            emoji="🚀"
            firstName="AI Freestyle"
            lastName="freestyle"
            studentEmail="Tell Copilot what to do, without any restrictions, formatting, or barriers!"
          />
          {/* Real World Benefits */}
          <Student
            key={'Real World Benefits'}
            emoji="🌎"
            firstName="Real World Benefits"
            lastName="real-life-benefits"
            studentEmail="Generate a list of real world benefits for a topic. This tool is great for helping students understand the importance of a topic."
          />
          {/* research-project-generator */}
          <Student
            key={'Research Project Generator'}
            emoji="🔎"
            firstName="Project Generator"
            lastName="research-project-generator"
            studentEmail="Generate a project for any unit or topic. This tool is perfect for coming up with fun, engaging, and educational projects for students."
          />
          {/* writing-prompts */}
          <Student
            key={'Writing Prompts'}
            emoji="✍️"
            firstName="Writing Prompts"
            lastName="writing-prompts"
            studentEmail="Invoke critical thinking and creativity with an AI generated writing prompt. This tool is great for helping students conceptualize new topics."
          />
          {/* student-reports */}
          <Student
            key={'Student Reports'}
            emoji="📜"
            firstName="Student Reports"
            lastName="student-reports"
            studentEmail="Generate a report for a student. This tool is great for helping students understand their strengths and weaknesses."
          />
          {/* parent-emails */}
          <Student
            key={'Parent Emails'}
            emoji="📧"
            firstName="Parent Emails"
            lastName="parent-emails"
            studentEmail="Generate a parent email for a student. This tool is great for keeping parents informed about their child's progress."
          />
        </div>
        {/* {numOfPages > 1 && <PageBtnContainer />} */}
      </Wrapper>
    </div>
  );
};

export default JobsContainer;
