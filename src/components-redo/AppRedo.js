import { useEffect, useReducer } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Error from "../components/Error";
import MainRedo from "./MainRedo";
import QuestionRedo from "./QuestionRedo";
import StartScreenRedo from "./StartScreenRedo";

const initialState = { questions: [], status: "loading", index: 0 };
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
      return { ...state, status: "active" };
    default:
      throw new Error("Action unknown");
  }
}
function AppRedo() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
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
        {status === "active" && <QuestionRedo question={questions[index]} />}
      </MainRedo>
    </div>
  );
}

export default AppRedo;
