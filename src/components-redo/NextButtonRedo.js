function NextButtonRedo({ dispatch, index, numQuestions, points }) {
  return index + 1 === numQuestions ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finish", payload: points })}>
      Finish
    </button>
  ) : (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}>
      Next
    </button>
  );
}

export default NextButtonRedo;
