function ProgressRedo({
  numQuestions,
  index,
  points,
  maxPossiblePoints,
  userSelectedOption,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(userSelectedOption !== null)}
      />
      <p>
        question: <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        {points}/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default ProgressRedo;
