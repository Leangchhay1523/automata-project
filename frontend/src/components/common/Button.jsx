export default function Button({
  className = "",
  content,
  onClick,
  isPrimary,
}) {
  return (
    <button
      className={`btn ${className} ${
        isPrimary ? "btn-primary" : "btn-secondary"
      } ${isPrimary ? "btn-hover-primary" : "btn-hover"}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
