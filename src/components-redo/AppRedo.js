import { useEffect, useReducer } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Error from "../components/Error";
import MainRedo from "./MainRedo";
import QuestionRedo from "./QuestionRedo";
import StartScreenRedo from "./StartScreenRedo";
import NextButtonRedo from "./NextButtonRedo";
import ProgressRedo from "./ProgressRedo";
import FinishScreenRedo from "./FinishScreenRedo";
import FooterRedo from "./FooterRedo";
import TimerRedo from "./TimerRedo";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  userSelectedOption: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const chosenCorrect =
        state.questions[state.index].correctOption === action.payload;
      return {
        ...state,
        userSelectedOption: action.payload,
        points: chosenCorrect
          ? state.points + state.questions[state.index].points
          : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, userSelectedOption: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          action.payload > state.highscore ? action.payload : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}
function AppRedo() {
  const [
    {
      questions,
      status,
      index,
      userSelectedOption,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  // console.log(questions, status);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <MainRedo>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreenRedo numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressRedo
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              userSelectedOption={userSelectedOption}
            />
            <QuestionRedo
              question={questions[index]}
              userSelectedOption={userSelectedOption}
              dispatch={dispatch}
            />
            <FooterRedo>
              <TimerRedo
                secondsRemaining={secondsRemaining}
                dispatch={dispatch}
              />
              {userSelectedOption !== null && (
                <NextButtonRedo
                  dispatch={dispatch}
                  numQuestions={numQuestions}
                  index={index}
                  points={points}
                />
              )}
            </FooterRedo>
          </>
        )}
        {status === "finished" && (
          <FinishScreenRedo
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainRedo>
    </div>
  );
}

export default AppRedo;
