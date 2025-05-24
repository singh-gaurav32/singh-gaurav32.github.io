// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <ul className="flex gap-6 text-lg">
        <li>
          <Link to="/" className="hover:text-yellow-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/passwords" className="hover:text-yellow-400">
            Passwords
          </Link>
        </li>
        <li>
          <Link to="/links" className="hover:text-yellow-400">
            Links
          </Link>
        </li>
        <li>
          <Link to="/maps" className="hover:text-yellow-400">
            Maps
          </Link>
        </li>
      </ul>
    </nav>
  );
}
