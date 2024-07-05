import OptionsRedo from "./OptionsRedo";

function QuestionRedo({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <OptionsRedo question={question} />
    </div>
  );
}

export default QuestionRedo;
