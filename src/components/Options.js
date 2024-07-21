import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { index, questions, answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions[index].options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswered
              ? i === questions[index].correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={hasAnswered}>
          {option}
        </button>
      ))}
    </div>
  );
}
export default Options;
