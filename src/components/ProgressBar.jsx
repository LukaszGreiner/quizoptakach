/* eslint-disable react/prop-types */
export default function ProgressBar({
  numQuestion = 1,
  totalQuestions,
  children,
}) {
  return (
    <header className="progress">
      <p>
        Co to za ptak?
        <div className="progress__buttons">{children}</div>
      </p>
      <div>
        <span>
          Pytanie {numQuestion}/{totalQuestions}
        </span>
        <progress max={totalQuestions} value={numQuestion} />
      </div>
    </header>
  );
}
