/* eslint-disable react/prop-types */
import { useQuizContext } from "../contexts/QuizContext";

import Homepage from "../pages/Homepage";
import Atlas from "../pages/Atlas";
import Quiz from "../pages/Quiz";

export default function App() {
  const { activePage } = useQuizContext();

  return (
    <>
      {activePage === "homepage" && <Homepage />}
      {activePage === "quiz" && <Quiz />}
      {activePage === "atlas" && <Atlas />}
    </>
  );
}
