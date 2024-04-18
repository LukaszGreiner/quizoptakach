/* eslint-disable react/prop-types */
export default function Button({
  onClick,
  className,
  children,
  isDisabled = false,
}) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
