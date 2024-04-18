/* eslint-disable react/prop-types */
import { useRef } from "react";

export default function Question({
  bird,
  dispatch,
  isAutoPlay = false,
  isImageHidden,
}) {
  const audioRef = useRef();
  return (
    <div>
      <img
        src={
          isImageHidden
            ? "src/assets/placeholder-bird-512x512.jpg"
            : bird.imageURL
        }
        alt="Sylwetka ptaka"
        className="quiz-container__image"
        style={{
          minWidth: "400px",
          width: "400px",
          height: "312px",
        }}
      />
      <div className="quiz-container--controls">
        <button onClick={() => dispatch({ type: "toggleHideImage" })}>
          {isImageHidden ? "Pokaż zdjęcie" : "Ukryj zdjęcie"}
        </button>

        {bird.audioURL === "" ? (
          <p>Brak audio</p>
        ) : (
          <>
            <figure>
              <audio
                ref={audioRef}
                controls
                autoPlay={isAutoPlay}
                src={bird.audioURL}
              >
                <source src={bird.audioURL} type="audio/mpeg"></source>
                Twoja przeglądarka nie pozwala na odtworzenie scieżki audio.
              </audio>
            </figure>
            <button
              onClick={() => {
                dispatch({ type: "toggleAutoplay" });
                isAutoPlay ? audioRef.current.pause() : audioRef.current.play();
              }}
            >
              Odtwarzaj automatycznie: {isAutoPlay ? "ON" : "OFF"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
