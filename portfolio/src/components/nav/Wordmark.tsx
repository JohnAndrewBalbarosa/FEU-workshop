import { Link } from 'react-router-dom';
import './nav.css';

export function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label="Home — John Andrew Balbarosa">
      <span className="wordmark__glyph" aria-hidden="true">
        §
      </span>
      <span className="wordmark__initials">JAB</span>
      <span className="wordmark__vol mono">Vol. 01</span>
    </Link>
  );
}
