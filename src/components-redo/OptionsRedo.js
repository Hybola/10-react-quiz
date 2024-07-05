function OptionsRedo({ question }) {
  return (
    <div className="options">
      {question.options.map((option) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default OptionsRedo;
