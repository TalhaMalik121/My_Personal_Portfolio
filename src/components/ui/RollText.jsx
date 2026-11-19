/**
 * Text that rolls up letter-by-letter on hover of the nearest `.roll-group`
 * ancestor (add that class to the link/button). Pure CSS transforms.
 */
export default function RollText({ children, className = "" }) {
  const text = String(children);
  return (
    <span className={`roll ${className}`} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden className="roll__char" style={{ "--i": i }}>
          <span>{c}</span>
          <span>{c}</span>
        </span>
      ))}
    </span>
  );
}
