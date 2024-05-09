import { useQuizContext } from "../contexts/QuizContext";
import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";
import Answer from "../components/Answer";
import Options from "../components/Options";
import Button from "../components/Button";

export default function Quiz() {
  const { hasAnswered, dispatch } = useQuizContext();

  return (
    <>
      <ProgressBar />
      <div className="quiz-container">
        {!hasAnswered && <Question />}

        {hasAnswered && <Answer />}

        <Options />
      </div>
      <br />
      {hasAnswered && (
        <Button onClick={() => dispatch({ type: "nextQuestion" })}>
          Dalej
        </Button>
      )}
    </>
  );
}
