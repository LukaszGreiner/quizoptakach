import { useQuizContext } from "../contexts/QuizContext";

/* eslint-disable react/prop-types */
export default function Answer() {
  const { bird } = useQuizContext();
  console.log(bird);

  return (
    <>
      <a href={bird.postURL} target="_blank">
        <img
          src={bird.imageURL}
          alt={bird.commonName}
          className="quiz-container__image"
          style={{
            minWidth: "400px",
            width: "400px",
            height: "312px",
            display: {},
          }}
        />
      </a>

      <div className="quiz-container__description">
        <h2>{bird.commonName}</h2>
        <i>{bird.scientificName}</i>
        <p>{bird.description}</p>
        <p>{bird.author}</p>
        <a href={bird.postURL} target="_blank">
          Czutaj więcej...
        </a>
      </div>
    </>
  );
}
