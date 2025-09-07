import React, { useState } from "react";
import VirtualPet from "./components/VirtualPet";
import "./App.css";

function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstructionsClick = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div className="App" style={{ minHeight: "100vh", position: "relative" }}>
      <VirtualPet />

      {/* Instructions Button at the bottom */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 50,
        }}
      >
        <button
          onClick={handleInstructionsClick}
          style={{
            background: "#fbbf24",
            color: "#222",
            fontWeight: "bold",
            padding: "12px 32px",
            borderRadius: "24px",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            fontSize: "1.1rem",
            marginBottom: "8px",
          }}
        >
          {showInstructions ? "Hide Instructions" : "Instructions"}
        </button>
        {showInstructions && (
          <div
            style={{
              margin: "16px auto 0",
              maxWidth: 480,
              background: "#fffbe7",
              border: "1px solid #fbbf24",
              borderRadius: "18px",
              padding: "20px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
              textAlign: "left",
              fontSize: "1.05rem",
              color: "#333",
              position: "relative",
              zIndex: 100,
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: 10,
              }}
            >
              How to Play with Your Virtual Dog
            </h2>
            <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
              <li>
                <b>Feed Dog</b>: Click the <b>Feed Dog</b> button to increase
                your dog's hunger and happiness. Don't overfeed!
              </li>
              <li>
                <b>Play</b>: Click <b>Play</b> to make your dog happy and
                active. Playing uses energy, so make sure your dog isn't too
                tired.
              </li>
              <li>
                <b>Sleep</b>: Click <b>Sleep</b> to let your dog rest and
                recover energy. Your dog can't play or eat while sleeping.
              </li>
              <li>
                <b>Monitor Stats</b>: Watch the <b>Hunger</b>, <b>Happiness</b>,
                and <b>Energy</b> bars. Keep them high for a happy, healthy dog!
              </li>
              <li>
                <b>Achievements</b>: Take good care of your dog to unlock fun
                achievements!
              </li>
              <li>
                <b>Day & Night</b>: The game has a day/night cycle. Your dog
                sleeps better at night!
              </li>
            </ul>
            <div
              style={{ marginTop: 12, fontSize: "0.98rem", color: "#a16207" }}
            >
              Tip: Interact regularly to keep your dog happy and healthy!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
