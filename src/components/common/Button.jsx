export default function Button({ content, onClick, isPrimary }) {
  return (
    <button
      className={`btn btn-hover ${isPrimary ? "btn-primary" : "btn-secondary"}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
