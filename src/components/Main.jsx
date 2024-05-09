import { useQuizContext } from "../contexts/QuizContext";
import Atlas from "../pages/Atlas";
import Quiz from "../pages/Quiz";

/* eslint-disable react/prop-types */
export default function Main() {
  const { hasAnswered, activePage, dispatch } = useQuizContext();
  return (
    <>
      {activePage === "mainMenu" && <Homepage />}
      {activePage === "atlas" && <Atlas />}
      {activePage === "quiz" && <Quiz />}
    </>
  );
}
