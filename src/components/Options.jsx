/* eslint-disable react/prop-types */
import Button from "./Button";

export default function Options({
  options,
  dispatch,
  hasAnswered,
  correctAnswer,
}) {
  return (
    <div className="quiz-container__options">
      {options.map((option) => (
        <Button
          key={option}
          isDisabled={hasAnswered}
          onClick={(e) => {
            dispatch({ type: "newAnswer", payload: option });
            dispatch({ type: "save" });
            e.target.className += " option--incorrect";
          }}
          className={
            hasAnswered && option === correctAnswer ? "option--correct" : ""
          }
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
