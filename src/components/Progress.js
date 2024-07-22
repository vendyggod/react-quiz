function Progress({ index, numQuestions, score, maxPossibleScore, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        {score} / {maxPossibleScore} points
      </p>
    </header>
  );
}

export default Progress;
