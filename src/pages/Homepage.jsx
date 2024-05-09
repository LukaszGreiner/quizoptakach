import Button from "../components/Button";
import { useQuizContext } from "../contexts/QuizContext";

/* eslint-disable react/prop-types */
export default function Homepage() {
  const { atlasData, totalQuestions, dispatch } = useQuizContext();

  const numKnown = atlasData.reduce(
    (count, bird) => (bird.atlasStatus ? count + 1 : count),
    0
  );
  return (
    <div>
      <header>
        <hgroup>
          <h1>Quiz o ptakach!</h1>
          <p>Sprawdź swoją wiedzę o ptakach i odkryj cały atlas!</p>
        </hgroup>
      </header>
      <div className="btn-container">
        <Button
          className="btn"
          onClick={() => {
            dispatch({ type: "start" });
          }}
        >
          Rozpocznij!
        </Button>
        <Button className="btn" onClick={() => dispatch({ type: "atlas" })}>
          Atlas {numKnown > 0 && `[${numKnown}/${totalQuestions}]`}
        </Button>
        <Button
          className="btn btn--danger"
          onClick={() => dispatch({ type: "resetSave" })}
        >
          Zresetuj stan gry i zacznij od nowa!
        </Button>
      </div>
    </div>
  );
}
