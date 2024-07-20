import OptionsRedo from "./OptionsRedo";

function QuestionRedo({ question, userSelectedOption, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <OptionsRedo
        question={question}
        userSelectedOption={userSelectedOption}
        dispatch={dispatch}
      />
    </div>
  );
}

export default QuestionRedo;
