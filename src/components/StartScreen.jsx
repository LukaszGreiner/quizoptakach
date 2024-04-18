/* eslint-disable react/prop-types */
export default function StartScreen({ dispatch }) {
  return (
    <div>
      <h1>Quiz o ptakach!</h1>
      <div className="btn-container">
        <button className="btn" onClick={() => dispatch({ type: "start" })}>
          Rozpocznij!
        </button>
        <button className="btn" onClick={() => dispatch({ type: "atlas" })}>
          Atlas
        </button>
        <button className="btn" onClick={() => dispatch({ type: "save" })}>
          Zapisz stan gry
        </button>
        <button className="btn" onClick={() => dispatch({ type: "resetSave" })}>
          Zresetuj stan gry i zacznij od nowa!
        </button>
      </div>
    </div>
  );
}
