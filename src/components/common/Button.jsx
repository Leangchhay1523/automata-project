export default function Button({ className, content, onClick, isPrimary }) {
  return (
    <button
      className={`btn btn-hover ${className} ${
        isPrimary ? "btn-primary" : "btn-secondary"
      }`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
