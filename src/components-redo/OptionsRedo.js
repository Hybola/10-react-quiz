function OptionsRedo({ question, dispatch, userSelectedOption }) {
  const hasAnswer = userSelectedOption !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            userSelectedOption === index ? "answer" : ""
          } ${
            hasAnswer
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswer}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default OptionsRedo;
