import React, { useState } from "react";
import "./App.scss";
import Square from "./components/Square/Square";
import Lottie from "lottie-react";
import animationData from "./assets/animations/congrats.json";
import cat from "./assets/animations/cat.json";
import dog from "./assets/animations/dog.json";

function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const setParentCounter = (index) => {
    if (squares[index] || winner || isDraw) return;
    const newSquares = squares.slice();
    newSquares[index] = count % 2 === 0 ? "X" : "O";
    setSquares(newSquares);
    setCount(count + 1);

    const win = checkWinner(newSquares);
    if (win) {
      setWinner(win);
    } else if (newSquares.every((square) => square !== null)) {
      setIsDraw(true);
    }
  };

  const winCompositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (squares) => {
    for (let combo of winCompositions) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const replay = () => {
    setSquares(Array(9).fill(null));
    setCount(0);
    setWinner(null);
    setIsDraw(false);
    setStart(true);
  };

  return (
    <div className="app">
      <h1 className="title">Tic-tac-toe</h1>
      {!start ? (
        <>
          <button
            className="btn pulse"
            onClick={() => {
              setStart(!start);
            }}
          >
            Start game
          </button>
          <Lottie animationData={dog} className="dog-animation" />
        </>
      ) : (
        <div className="game">
          {winner ? (
            <div className="text">Winner: {winner}</div>
          ) : isDraw ? (
            <div className="text">Draw!</div>
          ) : (
            <div className="text">Player {count % 2 === 0 ? "X" : "O"}</div>
          )}

          {(winner || isDraw) && (
            <>
              <Lottie
                animationData={winner ? animationData : cat}
                style={{ width: 300, height: 300 }}
              />
              <button className="btn pulse" onClick={() => replay()}>
                Replay
              </button>
            </>
          )}

          <div className="board">
            {squares.map((value, index) => (
              <Square
                key={index}
                index={index}
                value={value}
                counter={setParentCounter}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
