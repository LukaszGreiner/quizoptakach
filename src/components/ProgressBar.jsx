import { useQuizContext } from "../contexts/QuizContext";
import Button from "./Button";

/* eslint-disable react/prop-types */
export default function ProgressBar() {
  const {
    numQuestion = 1,
    totalQuestions,
    hasAnswered,
    dispatch,
  } = useQuizContext();

  return (
    <header className="progress">
      <p>Co to za ptak?</p>
      <div className="progress__buttons">
        <Button onClick={() => dispatch({ type: "setPage", payload: "atlas" })}>
          Atlas
        </Button>
        <Button
          onClick={() => dispatch({ type: "setPage", payload: "homepage" })}
        >
          Menu główne
        </Button>
        <Button
          onClick={() => {
            hasAnswered && dispatch({ type: "nextQuestion" });
          }}
          isDisabled={!hasAnswered}
        >
          Dalej
        </Button>
      </div>
      <div>
        <span>
          Pytanie {numQuestion}/{totalQuestions}
        </span>
        <progress max={totalQuestions} value={numQuestion} />
      </div>
    </header>
  );
}
