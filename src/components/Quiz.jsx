import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import Question from "./Question";
import Result from "./Result";



const QUESTION_TIME = 10;

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const [quizFinished, setQuizFinished] = useState(false);

  const question = questions[currentQuestion];

  useEffect(() => {
    if (quizFinished) return;

    setTimeLeft(QUESTION_TIME);

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          return 0;
        }

        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, quizFinished]);

  useEffect(() => {
    if (timeLeft === 0 && !quizFinished) {
      goToNextQuestion();
    }
  }, [timeLeft]);

  const selectAnswer = (answer) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setQuizFinished(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion === 0) return;

    setCurrentQuestion((previous) => previous - 1);
  };

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      if (selectedAnswers[question.id] === question.answer) {
        return score + 1;
      }

      return score;
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setTimeLeft(QUESTION_TIME);
  };

  if (quizFinished) {
    return (
      <Result
        score={calculateScore()}
        total={questions.length}
        onRestart={restartQuiz}
      />
    );
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div>
          <p className="quiz-label">INTERACTIVE QUIZ</p>

          <h1>JavaScript & React Quiz</h1>
        </div>

        <div className="timer">
          ⏱ {timeLeft}s
        </div>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="question-number">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      <Question
        question={question}
        selectedAnswer={selectedAnswers[question.id]}
        onSelectAnswer={selectAnswer}
      />

      <div className="navigation">
        <button
          className="previous-btn"
          onClick={goToPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>

        <button
          className="next-btn"
          onClick={goToNextQuestion}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next →"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
