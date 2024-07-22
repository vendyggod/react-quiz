function ButtonNext({ answer, index, numQuestions, dispatch }) {
  if (answer !== null && index + 1 < numQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  if (answer !== null && index + 1 === numQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finished' })}
      >
        Finish
      </button>
    );
}

export default ButtonNext;
