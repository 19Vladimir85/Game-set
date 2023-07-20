import "./Tic-Tac-Toe.css";
import { useState, useEffect } from "react";
import Header from "../../Header/Header";

function checkWinner(field) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (field[a] !== null && field[a] === field[b] && field[b] === field[c]) {
      return true;
    }
  }
  return false;
}
const startField = [null, null, null, null, null, null, null, null, null];

function isFriendShip(field) {
  return field.every((el) => el) && !checkWinner(field);
}

function Game() {
  const [friendShip, setFriendShip] = useState(false);
  const [winner, setWinner] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [status, setStatus] = useState(`Текущий игрок: ${currentPlayer}`);
  const [currentField, setCurrentField] = useState(startField);
  useEffect(() => {
    if (winner) {
      setStatus(`Победил: ${currentPlayer}`);
    } else if (friendShip) {
      setStatus("Победила дружба!");
    } else {
      setStatus(`Текущий игрок: ${currentPlayer}`);
    }
  }, [winner, friendShip, currentPlayer]);

  function onClick(index) {
    if (currentField[index] === null && (!winner || !friendShip)) {
      const newField = [...currentField];
      newField[index] = currentPlayer;
      const newPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentField(newField);
      if (isFriendShip(newField)) {
        setFriendShip(true);
        return;
      }
      if (!checkWinner(newField)) {
        setCurrentPlayer(newPlayer);
      }
      setWinner(checkWinner(newField));
    }
  }

  function restart() {
    setCurrentField(startField);
    setCurrentPlayer("X");
    setWinner(false);
    setStatus(`Текущий игрок: ${currentPlayer}`);
  }

  return (
    <>
      <Header></Header>
      <div className="main_screen">
        <button className="restart" onClick={restart}>
          Играть ещё
        </button>
        <div className="status">{status}</div>
        <div className="field">
          {currentField.map((el, id) => (
            <div className="square" key={id} onClick={() => onClick(id)}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Game;
