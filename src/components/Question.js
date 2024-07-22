import Options from './Options';
import Button from './ButtonNext';

function Question({ question, answer, dispatch, numQuestions, index }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;
