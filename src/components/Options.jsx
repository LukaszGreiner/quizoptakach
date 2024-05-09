/* eslint-disable react/prop-types */
import { useQuizContext } from "../contexts/QuizContext";
import Button from "./Button";

export default function Options() {
  const { options, dispatch, hasAnswered, correctAnswer } = useQuizContext();
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
