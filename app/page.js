'use client'
import { useState } from "react";

const equipmentsList = [
  { name: "🗡️ Buster Sword", power: 2, toughness: 0 },
  { name: "🛡️ Darksteel Plate", power: 0, toughness: 2 },
  { name: "🥾 Swiftfoot Boots", power: 0, toughness: 0 },
  { name: "⚡ Lightning Greaves", power: 0, toughness: 0 },
  { name: "🔨 Colossus Hammer", power: 10, toughness: 10 },
  { name: "👑 Blackblade Reforged", power: 0, toughness: 0, special: "blackblade" }
];

export default function Home() {
  const [copies, setCopies] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState("main");
  const [equipped, setEquipped] = useState({ main: [], copies: {} });
  const [blackbladeCounters, setBlackbladeCounters] = useState(0);
  const [treasures, setTreasures] = useState(0);
  const [mirrorBox, setMirrorBox] = useState(false);

  const getStats = (target) => {
    let basePower = 4;
    let baseToughness = 4;

    let eqs = target === "main"
      ? equipped.main
      : equipped.copies[target] || [];

    eqs.forEach(eq => {
      if (eq.special === "blackblade") {
        basePower += blackbladeCounters;
        baseToughness += blackbladeCounters;
      } else {
        basePower += eq.power;
        baseToughness += eq.toughness;
      }
    });

    if (mirrorBox) {
      basePower += 1 + copies;
      baseToughness += 1 + copies;
    }

    return { basePower, baseToughness };
  };

  const equipItem = (item) => {
    if (selectedTarget === "main") {
      setEquipped(prev => ({
        ...prev,
        main: [...prev.main, item]
      }));
    } else {
      setEquipped(prev => ({
        ...prev,
        copies: {
          ...prev.copies,
          [selectedTarget]: [
            ...(prev.copies[selectedTarget] || []),
            item
          ]
        }
      }));
    }
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: 20 }}>
      <h1>⚔️ Cloud Commander</h1>

      {/* CONTROLLI GLOBALI */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setCopies(copies + 1)}>➕ Copia</button>
        <button onClick={() => setCopies(Math.max(0, copies - 1))}>➖ Copia</button>

        <button onClick={() => setTreasures(treasures + 1)}>💰 Tesoro</button>
        <button onClick={() => setTreasures(Math.max(0, treasures - 1))}>❌ Tesoro</button>

        <button onClick={() => setMirrorBox(!mirrorBox)}>
          🪞 Mirror Box: {mirrorBox ? "ON" : "OFF"}
        </button>
      </div>

      {/* BLACKBLADE */}
      <div style={{ marginBottom: 20 }}>
        <h3>👑 Blackblade Counters: {blackbladeCounters}</h3>
        <button onClick={() => setBlackbladeCounters(blackbladeCounters + 1)}>➕</button>
        <button onClick={() => setBlackbladeCounters(Math.max(0, blackbladeCounters - 1))}>➖</button>
      </div>

      {/* CLOUD PRINCIPALE */}
      <div
        onClick={() => setSelectedTarget("main")}
        style={{
          border: selectedTarget === "main" ? "3px solid gold" : "1px solid gray",
          padding: 20,
          marginBottom: 20
        }}
      >
        <h2>☁️ Cloud (Main)</h2>
        <p>
          {getStats("main").basePower} / {getStats("main").baseToughness}
        </p>
      </div>

      {/* COPIE */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {Array.from({ length: copies }).map((_, i) => {
          const id = "copy-" + i;
          const stats = getStats(id);

          return (
            <div
              key={id}
              onClick={() => setSelectedTarget(id)}
              style={{
                width: "30%",
                background: "rgba(0,150,255,0.2)",
                border: selectedTarget === id ? "3px solid cyan" : "1px solid gray",
                padding: 10
              }}
            >
              <h3>👥 Copia {i + 1}</h3>
              <p>{stats.basePower} / {stats.baseToughness}</p>
            </div>
          );
        })}
      </div>

      {/* EQUIP */}
      <h2 style={{ marginTop: 30 }}>Equipaggiamenti</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {equipmentsList.map((item, i) => (
          <button key={i} onClick={() => equipItem(item)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
