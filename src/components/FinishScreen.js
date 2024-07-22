function FinishScreen({ score, maxPossibleScore, highscore, dispatch }) {
  const percentage = (score / maxPossibleScore) * 100;
  return (
    <>
      <p className="result">
        Your scored {score} out of {maxPossibleScore} ({Math.ceil(percentage)}%)
        points
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Reset
      </button>
    </>
  );
}

export default FinishScreen;
