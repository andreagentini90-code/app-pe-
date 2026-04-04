'use client'
import { useState } from "react";

export default function Home() {
  const [copies, setCopies] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "20px"
    }}>
      <h1>⚔️ Cloud Commander Tracker</h1>

      <h2>Cloud Base: 4 / 4</h2>

      <p>Copie: {copies}</p>

      <button onClick={() => setCopies(copies + 1)}>
        ➕ Aggiungi copia
      </button>

      <button onClick={() => setCopies(Math.max(0, copies - 1))}>
        ➖ Rimuovi copia
      </button>
    </div>
  );
}
