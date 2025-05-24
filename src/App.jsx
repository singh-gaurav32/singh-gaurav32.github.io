// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<h1 className="p-6 text-2xl">Welcome to your Dashboard</h1>}
        />
        <Route
          path="/passwords"
          element={<h1 className="p-6 text-2xl">🔐 Passwords Page</h1>}
        />
        <Route
          path="/links"
          element={<h1 className="p-6 text-2xl">🔗 Links Page</h1>}
        />
        <Route
          path="/maps"
          element={<h1 className="p-6 text-2xl">🗺️ Maps Page</h1>}
        />
      </Routes>
    </div>
  );
}
