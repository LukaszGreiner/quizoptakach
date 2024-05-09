import { createContext, useContext, useEffect, useReducer } from "react";
import questions from "../../Data/questions.json";

const QuizContext = createContext();

const shuffledQuestions = questions.slice().sort(() => 0.5 - Math.random());
// const shuffledQuestions = questions.slice();
const initialValues = {
  activePage: "homepage",
  save: false,

  bird: null,
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

function reducer(state, action) {
  const currentBird = shuffledQuestions.at(state.index);
  const nextBird = shuffledQuestions.at(state.index + 1);

  function save() {
    if (state.save) {
      console.log("State saved");
      localStorage.setItem("QUIZ_SAVE", JSON.stringify(state));
    }
  }

  switch (action.type) {
    case "start":
      return {
        ...state,
        activePage: "quiz",
        currentBird: currentBird,
        options:
          state.options.length === 0
            ? getRandomOptions(currentBird.commonName)
            : state.options,
        correctAnswer: currentBird.commonName,
      };
    case "setPage": {
      return {
        ...state,
        activePage: action.payload,
        save: true,
      };
    }
    case "continue":
      return {
        ...state,
        activePage: "quiz",
      };
    case "save":
      return {
        ...state,
      };
    case "resetSave": {
      const reset = window.confirm("Czy zresetować cały postęp quizu?");
      if (reset) save();
      const newState = reset ? defaultValues : state;
      return {
        ...newState,
      };
    }
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

function QuizProvider({ children }) {
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

  const bird = shuffledQuestions.at(index);
  const totalQuestions = questions.length + 1;
  const numQuestion = index + 1;

  useEffect(() => {
    if (dispatch.save) {
      dispatch({
        type: "save",
        payload: true,
      });
    }
  }, [dispatch.save]);

  return (
    <QuizContext.Provider
      value={{
        activePage,
        index,
        options,
        hasAnswered,
        correctAnswer,
        isImageHidden,
        isAutoPlay,
        atlasData,

        bird,
        totalQuestions,
        numQuestion,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuizContext };
