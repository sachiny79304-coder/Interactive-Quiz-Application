function Question({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            className={`option ${
              selectedAnswer === option ? "selected" : ""
            }`}
            onClick={() => onSelectAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
