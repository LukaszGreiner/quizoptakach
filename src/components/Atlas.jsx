/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/atlas.css";

export default function Atlas({ data, dispatch }) {
  const [filter, setFliter] = useState("all");

  const filterData = (data, filter) => {
    switch (filter) {
      case "all":
        return data;
      case "unknown":
        return data.filter(({ atlasStatus }) => atlasStatus === "unknown");
      case "known":
        return data.filter(({ atlasStatus }) => atlasStatus === "known");
      case "unseen":
        return data.filter(({ atlasStatus }) => !atlasStatus);
      default:
        return data;
    }
  };
  const filteredData = filterData(data, filter);

  const numTotal = data.length;
  const numSeen = data.filter((bird) => bird.atlasStatus === "unknown").length;
  const numKnown = data.filter((bird) => bird.atlasStatus === "known").length;

  return (
    <>
      <nav className="atlas-nav">
        <button onClick={() => dispatch({ type: "start" })}>Quiz</button>
        <button onClick={() => dispatch({ type: "mainMenu" })}>
          Menu główne
        </button>
      </nav>
      <header>
        <hgroup>
          <h1>Atlas</h1>
          <p>
            Odkryte: [{numSeen + numKnown}/{numTotal}] Poznane: [{numKnown}/
            {numTotal}]
          </p>
        </hgroup>
      </header>
      <nav>
        <label htmlFor="filter-select">Filtruj wyniki:</label>
        <select
          id="filter-select"
          value={filter}
          onChange={(e) => setFliter(e.target.value)}
        >
          <option value="all">Wszystkie</option>
          <option value="known">Poznane</option>
          <option value="unknown">Widziane</option>
          <option value="unseen">Nieodkryte</option>
        </select>
      </nav>
      <div className="atlas">
        {data.length === 0 && <p>Rozpocznij quiz, aby odkryć ptaki!</p>}
        {filteredData.map((bird) => (
          <BirdContainer key={bird.commonName} bird={bird} />
        ))}
      </div>
    </>
  );
}

function BirdContainer({ bird }) {
  if (!bird.atlasStatus) {
    return (
      <div className="bird-container">
        <img
          className="bird-container--image"
          src="public/placeholder-bird.jpg"
          alt="Dotychczas nieodkryty przez gracza ptak"
        />
        <div className="description">
          <h2>Nie odkryty</h2>
          <i>???</i>
        </div>
      </div>
    );
  }

  if (bird.atlasStatus === "unknown") {
    return (
      <div className="bird-container">
        <img
          className="bird-container--image"
          src={bird.imageURL}
          alt="Dotychczas niepoznany przez gracza ptak"
        />
        <div className="description">
          <h2>Gdzieś go już widziałem/am!</h2>
          <i>???</i>
        </div>
      </div>
    );
  }

  return (
    <div className="bird-container">
      <a href={bird.postURL} target="_blank">
        <img
          className={"bird-container--image"}
          src={bird.imageURL}
          alt={bird.commonName}
        />
      </a>
      <div className="description">
        <a href={bird.postURL} target="_blank">
          <h2>{bird.commonName}</h2>
          <i>{bird.scientificName}</i>
        </a>
        <figure>
          {bird.audioURL ? (
            <audio controls src={bird.audioURL}>
              <source src={bird.audioURL} type="audio/mpeg"></source>
              Twoja przeglądarka nie pozwala na odtworzenie scieżki audio.
            </audio>
          ) : (
            <p>Brak ścieżki audio</p>
          )}
        </figure>
      </div>
    </div>
  );
}
