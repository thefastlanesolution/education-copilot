import React, { useEffect } from 'react';

const Quiz = ({
  questions,
  answers,
  className,
  fetch,
  setQuestions,
  setAnswers,
  handleNewQuestion,
}) => {
  const deleteQuestionAnswers = index => {
    const newQuestions = [...questions];
    const newAnswers = [...answers];
    newQuestions.splice(index, 1);
    newAnswers.splice(index, 1);
    setQuestions(newQuestions);
    setAnswers(newAnswers);
  };

  return (
    <div className={className}>
      {questions.map((question, index) => (
        <div key={index} className="quiz-container">
          <div className="quiz-content">
            <div>
              <div className="question-number">
                <strong>Question {index + 1}</strong>
              </div>
            </div>
            <div>{question}</div>
            <p>
              {answers[index]
                .split('\n')
                .map(x => x.trim())
                .map((item, index) => {
                  return (
                    <span key={index}>
                      {item}
                      <br />
                    </span>
                  );
                })}
            </p>
          </div>
          <div className="individual-quiz-controls">
            <button
              className="btn btn-success"
              onClick={() => handleNewQuestion(index)}
            >
              New Question
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteQuestionAnswers(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
