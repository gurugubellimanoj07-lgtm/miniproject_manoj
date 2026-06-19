import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState([
    "John",
    "Emma",
    "Michael",
    "Sophia",
    "Daniel",
  ]);
  const [winner, setWinner] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const addParticipant = () => {
    if (!name.trim()) return;
    setParticipants([...participants, name.trim()]);
    setName("");
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const resetDraw = () => {
    setWinner("");
    setCurrentName("");
  };

  const startLuckyDraw = () => {
    if (participants.length < 2) {
      alert("Add at least 2 participants");
      return;
    }

    setIsDrawing(true);
    setWinner("");

    let count = 0;

    const interval = setInterval(() => {
      const random =
        participants[Math.floor(Math.random() * participants.length)];

      setCurrentName(random);
      count++;

      if (count > 30) {
        clearInterval(interval);

        const finalWinner =
          participants[Math.floor(Math.random() * participants.length)];

        setCurrentName(finalWinner);
        setWinner(finalWinner);
        setIsDrawing(false);
      }
    }, 120);
  };

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Poppins',sans-serif;
        }

        body{
          background:linear-gradient(
            135deg,
            #667eea,
            #764ba2,
            #ff6b6b,
            #ffb347
          );
          background-size:400% 400%;
          animation:gradientBG 12s ease infinite;
        }

        @keyframes gradientBG{
          0%{background-position:0% 50%;}
          50%{background-position:100% 50%;}
          100%{background-position:0% 50%;}
        }

        .lucky-container{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
        }

        .card{
          width:100%;
          max-width:800px;
          background:rgba(255,255,255,0.15);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.2);
          border-radius:25px;
          padding:30px;
          box-shadow:0 20px 50px rgba(0,0,0,0.2);
          color:white;
        }

        .card h1{
          text-align:center;
          margin-bottom:25px;
          font-size:2.5rem;
        }

        .input-section{
          display:flex;
          gap:10px;
          margin-bottom:25px;
        }

        .input-section input{
          flex:1;
          padding:14px;
          border:none;
          border-radius:12px;
          outline:none;
          font-size:16px;
        }

        .input-section button{
          padding:14px 25px;
          border:none;
          border-radius:12px;
          background:#00e676;
          color:white;
          cursor:pointer;
          font-weight:600;
          transition:.3s;
        }

        .input-section button:hover{
          transform:translateY(-3px);
        }

        .participant-box{
          margin-bottom:30px;
        }

        .participant-box h3{
          margin-bottom:15px;
        }

        .participant-list{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(150px,1fr));
          gap:10px;
        }

        .participant-item{
          background:rgba(255,255,255,0.15);
          border-radius:12px;
          padding:10px 12px;
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .delete-btn{
          background:none;
          border:none;
          color:#ff5252;
          cursor:pointer;
          font-size:16px;
        }

        .draw-area{
          text-align:center;
          margin:30px 0;
        }

        .draw-display{
          height:120px;
          display:flex;
          justify-content:center;
          align-items:center;
          font-size:2rem;
          font-weight:bold;
          background:rgba(255,255,255,0.2);
          border-radius:20px;
          margin-bottom:20px;
        }

        .drawing-animation{
          animation:pulse .3s infinite;
        }

        @keyframes pulse{
          0%{transform:scale(1);}
          50%{
            transform:scale(1.05);
            background:rgba(255,255,255,0.3);
          }
          100%{transform:scale(1);}
        }

        .winner-box{
          font-size:1.5rem;
          font-weight:bold;
          padding:15px;
          border-radius:15px;
          background:linear-gradient(90deg,#ffd700,#ff9800);
          color:#222;
          animation:winnerGlow 1s infinite alternate;
        }

        @keyframes winnerGlow{
          from{box-shadow:0 0 10px gold;}
          to{box-shadow:0 0 30px gold;}
        }

        .buttons{
          display:flex;
          justify-content:center;
          gap:15px;
        }

        .draw-btn,
        .reset-btn{
          padding:14px 25px;
          border:none;
          border-radius:12px;
          font-size:16px;
          font-weight:600;
          cursor:pointer;
          transition:.3s;
        }

        .draw-btn{
          background:linear-gradient(45deg,#00c6ff,#0072ff);
          color:white;
        }

        .reset-btn{
          background:linear-gradient(45deg,#ff416c,#ff4b2b);
          color:white;
        }

        .draw-btn:hover,
        .reset-btn:hover{
          transform:translateY(-3px) scale(1.03);
        }

        .draw-btn:disabled{
          opacity:.6;
          cursor:not-allowed;
        }

        @media(max-width:600px){
          .card{
            padding:20px;
          }

          .card h1{
            font-size:1.8rem;
          }

          .draw-display{
            font-size:1.5rem;
          }

          .buttons{
            flex-direction:column;
          }

          .input-section{
            flex-direction:column;
          }
        }
      `}</style>

      <div className="lucky-container">
        <div className="card">
          <h1>🎉 Lucky Draw Simulator</h1>

          <div className="input-section">
            <input
              type="text"
              placeholder="Enter participant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button onClick={addParticipant}>Add</button>
          </div>

          <div className="participant-box">
            <h3>Participants ({participants.length})</h3>

            <div className="participant-list">
              {participants.map((person, index) => (
                <div key={index} className="participant-item">
                  <span>{person}</span>

                  <button
                    className="delete-btn"
                    onClick={() => removeParticipant(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="draw-area">
            <div
              className={`draw-display ${
                isDrawing ? "drawing-animation" : ""
              }`}
            >
              {currentName || "Ready For Draw"}
            </div>

            {winner && (
              <div className="winner-box">
                🏆 Winner: <strong>{winner}</strong>
              </div>
            )}
          </div>

          <div className="buttons">
            <button
              className="draw-btn"
              disabled={isDrawing}
              onClick={startLuckyDraw}
            >
              {isDrawing ? "Drawing..." : "Start Lucky Draw"}
            </button>

            <button className="reset-btn" onClick={resetDraw}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}