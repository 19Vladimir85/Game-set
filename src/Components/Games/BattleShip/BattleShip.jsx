import "./BattleShip.css";
import { useState } from "react";
import { ReactComponent as CrossIcon } from "./cross.svg";
import { ReactComponent as SquareIcon } from "./square.svg";
import Header from "../../Header/Header";

export const FIELD_BATTLESHIP = [
  [".", "X", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "X", ".", ".", ".", "X", ".", ".", "X", "."],
  [".", "X", ".", ".", ".", ".", ".", ".", "X", "."],
  [".", "X", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", "X", "X", "X", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "X"],
  [".", "X", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "X", "X", ".", ".", ".", "X", "."],
  ["X", ".", ".", ".", ".", ".", ".", ".", "X", "."],
  ["X", ".", ".", ".", ".", ".", "X", ".", "X", "."],
];

function Cell({ ship, onClickCell, x, y }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cell"
      onClick={() => {
        if (open) return;
        setOpen(true);
        onClickCell(x, y);
      }}
    >
      {open ? (
        ship ? (
          <>
            <CrossIcon className="ship" />
            <SquareIcon className="square_for_ship" />
          </>
        ) : (
          <SquareIcon className="openIcon" />
        )
      ) : (
        <SquareIcon className="closeIcon" />
      )}
    </div>
  );
}

const isShipCell = (a, b, field) => field[a][b] === "X";

function BattleField({ field, onClickCell }) {
  const battleField = new Array(10).fill(new Array(10).fill(<></>));
  return (
    <div className="battle_field">
      {battleField.map((row, y) => (
        <div className="raw" key={y}>
          {row.map((item, x) => (
            <Cell
              key={`${x}-${y}`}
              x={x}
              y={y}
              onClickCell={onClickCell}
              // onClickCell={() => onClickCell(x, y)}
              ship={isShipCell(x, y, field)}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
}

function Game() {
  const [shots, setShots] = useState(0);
  const [hits, setHits] = useState(0);
  function onClickCell(x, y) {
    setShots(shots + 1);
    if (isShipCell(x, y, FIELD_BATTLESHIP)) {
      setHits(hits + 1);
    }
    console.log("Функция из компонента Game", x, y);
  }
  return (
    <>
      <Header></Header>
      <div className="score">
        <p>Shots: {shots}</p>
        <p>Hits: {hits}</p>
      </div>
      <BattleField
        onClickCell={onClickCell}
        field={FIELD_BATTLESHIP}
      ></BattleField>
    </>
  );
}

export default Game;
