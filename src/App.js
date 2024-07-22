/* eslint-disable no-fallthrough */
import './index.css';
import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import ButtonNext from './components/ButtonNext';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // App statuses: 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  score: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'start',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case 'reset':
      return { ...initialState, questions: state.questions, status: 'ready' };
    case 'timerTick': {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    }
    default:
      throw new Error('Unknown action');
  }
}

function App() {
  const [
    { questions, status, index, answer, score, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossibleScore = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();

        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'start' && (
          <Progress
            index={index}
            numQuestions={numQuestions}
            score={score}
            maxPossibleScore={maxPossibleScore}
            answer={answer}
          />
        )}
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'start' && (
          <Question
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
            numQuestions={numQuestions}
            index={index}
          />
        )}
        {status === 'finished' && (
          <FinishScreen
            score={score}
            maxPossibleScore={maxPossibleScore}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}

        <Footer>
          {status === 'start' && (
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
          )}
          <ButtonNext
            answer={answer}
            index={index}
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        </Footer>
      </Main>
    </div>
  );
}

export default App;
