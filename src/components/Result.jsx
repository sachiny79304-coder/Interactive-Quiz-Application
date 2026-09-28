function Result({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  let message;

  if (percentage >= 80) {
    message = "Excellent work!";
  } else if (percentage >= 50) {
    message = "Good job! Keep practicing.";
  } else {
    message = "Keep learning and try again!";
  }

  return (
    <div className="result-card">
      <h1>Quiz Completed!</h1>

      <div className="score-circle">
        <span>{percentage}%</span>
      </div>

      <h2>{message}</h2>

      <p>
        You scored <strong>{score}</strong> out of{" "}
        <strong>{total}</strong>.
      </p>

      <button className="restart-btn" onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
}

export default Result;
