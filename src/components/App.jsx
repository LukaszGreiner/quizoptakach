/* eslint-disable react/prop-types */
import { useReducer } from "react";
import questions from "../../Data/questions.json";
import Main from "./Main";
import StartScreen from "./StartScreen";
import ProgressBar from "./ProgressBar";
import Answer from "./Answer";
import Options from "./Options";
import Question from "./Question";
import Atlas from "./Atlas";

const shuffledQuestions = questions.slice().sort(() => 0.5 - Math.random());
// const shuffledQuestions = questions.slice();

function getRandomOptions(correctAnswer) {
  const randomOptions = shuffledQuestions
    .filter((bird) => bird.commonName !== correctAnswer)
    .map((bird) => bird.commonName)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .concat(correctAnswer)
    .sort(() => 0.5 - Math.random());
  return randomOptions;
}

const initialValues = {
  activePage: "mainMenu",
  index: 0,
  options: [],
  // correctAnswer is used to style options
  correctAnswer: "",
  hasAnswered: false,
  isAnswerCorrect: null,
  isImageHidden: false,
  isAutoPlay: false,

  atlasData: questions.slice(),
};
const defaultValues = initialValues;

function reducer(state, action) {
  const currentBird = shuffledQuestions[state.index];
  const nextBird = shuffledQuestions[state.index + 1];
  switch (action.type) {
    case "start":
      return {
        ...state,
        activePage: "inGame",
        currentBird: currentBird,
        options:
          state.options.length === 0
            ? getRandomOptions(currentBird.commonName)
            : state.options,
        correctAnswer: currentBird.commonName,
      };
    case "mainMenu":
      return {
        ...state,
        activePage: "mainMenu",
      };
    case "continue":
      return {
        ...state,
        activePage: "inGame",
      };
    case "save":
      localStorage.setItem("QUIZ_SAVE", JSON.stringify(state));
      return {
        ...state,
      };
    case "resetSave":
      localStorage.setItem("QUIZ_SAVE", JSON.stringify(defaultValues));
      return {
        ...defaultValues,
      };
    case "atlas":
      return {
        ...state,
        activePage: "atlas",
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        options: getRandomOptions(nextBird.commonName),
        correctAnswer: nextBird.commonName,
        hasAnswered: false,
        isAnswerCorrect: null,
      };
    case "prevQuestion":
      return {
        ...state,
        index: state.index - 1,
      };
    case "newAnswer": {
      const isAnswerCorrect = action.payload === state.correctAnswer;
      const atlasStatus = isAnswerCorrect ? "known" : "unknown";
      const newAtlasData = state.atlasData.map((bird) =>
        bird.commonName === currentBird.commonName
          ? { ...bird, atlasStatus: atlasStatus }
          : bird
      );
      return {
        ...state,
        hasAnswered: true,
        isAnswerCorrect: isAnswerCorrect,
        atlasData: newAtlasData,
      };
    }
    case "toggleHideImage": {
      return {
        ...state,
        isImageHidden: !state.isImageHidden,
      };
    }
    case "toggleAutoplay": {
      return {
        ...state,
        isAutoPlay: !state.isAutoPlay,
      };
    }
    default:
      throw new Error("Invalid action");
  }
}
export default function App() {
  const [
    {
      activePage,
      index,
      options,
      hasAnswered,
      correctAnswer,
      isImageHidden,
      isAutoPlay,
      atlasData,
    },
    dispatch,
  ] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("QUIZ_SAVE")) || initialValues
  );

  const activeBird = shuffledQuestions[index];
  const totalQuestions = questions.length + 1;
  const numQuestion = index + 1;

  return (
    <>
      <Main>
        {activePage === "mainMenu" && <StartScreen dispatch={dispatch} />}
        {activePage === "atlas" && (
          <Atlas data={atlasData} dispatch={dispatch} />
        )}
        {activePage === "inGame" && (
          <>
            <ProgressBar
              totalQuestions={totalQuestions}
              numQuestion={numQuestion}
            >
              <button onClick={() => dispatch({ type: "atlas" })}>Atlas</button>
              <button onClick={() => dispatch({ type: "mainMenu" })}>
                Menu główne
              </button>
              <button
                disabled={!hasAnswered}
                onClick={() => {
                  hasAnswered && dispatch({ type: "nextQuestion" });
                }}
              >
                Dalej
              </button>
            </ProgressBar>
            <div className="quiz-container">
              {!hasAnswered && (
                <Question
                  bird={activeBird}
                  hasAnswered={hasAnswered}
                  dispatch={dispatch}
                  isAutoPlay={isAutoPlay}
                  isImageHidden={isImageHidden}
                />
              )}

              {hasAnswered && <Answer bird={activeBird} />}

              <Options
                options={options}
                dispatch={dispatch}
                hasAnswered={hasAnswered}
                correctAnswer={correctAnswer}
              />
            </div>
            <br />
            {hasAnswered && (
              <button onClick={() => dispatch({ type: "nextQuestion" })}>
                Dalej
              </button>
            )}
          </>
        )}
      </Main>
      <footer></footer>
    </>
  );
}
