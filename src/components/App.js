import { useEffect, useReducer } from "react";
// import DateCounter from "./DateCounter";
// import DateCounter from "./DateCounter-Redo";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";
export default function App() {
  const {
    status,
    index,
    answer,
    points,
    highscore,
    numQuestions,
    maxPossiblePoints,
    dispatch,
  } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === `loading` && <Loader />}
        {status === `error` && <Error />}
        {status === `ready` && <StartScreen />}
        {status === `active` && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
  // return <DateCounter />;
}
