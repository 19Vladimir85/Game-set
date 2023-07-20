import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./heroes.css";

export const COMICS = {
  DC: "dc",
  MARVEL: "marvel",
};

export const HEROES = [
  {
    name: "Superman",
    comics: "dc",
  },
  {
    name: "Batman",
    comics: "dc",
  },
  {
    name: "Flash",
    comics: "dc",
  },
  {
    name: "Aquaman",
    comics: "dc",
  },
  {
    name: "Wonder Woman",
    comics: "dc",
  },
  {
    name: "Green Lantern",
    comics: "dc",
  },
  {
    name: "Iron Man",
    comics: "marvel",
  },
  {
    name: "Spiderman",
    comics: "marvel",
  },
  {
    name: "Captain America",
    comics: "marvel",
  },
  {
    name: "Thor",
    comics: "marvel",
  },
  {
    name: "Hulk",
    comics: "marvel",
  },
  {
    name: "Black Widow",
    comics: "marvel",
  },
];

const initialState = {
  marvel: [],
  dc: [],
  center: HEROES,
};

function Hero({ gragbleId, columnIndex }) {
  return (
    <Draggable draggableId={gragbleId} index={columnIndex}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {gragbleId}
          </div>
        );
      }}
    </Draggable>
  );
}

function Column({ id, heroes }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => {
        return (
          <div
            className="column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            {heroes.map((hero, index) => (
              <Hero
                key={hero.name}
                gragbleId={hero.name}
                columnIndex={index}
              ></Hero>
            ))}
          </div>
        );
      }}
    </Droppable>
  );
}

function Menu({ timer, score, gameState, onStart, onEnd }) {
  if (gameState === "Ready") {
    return (
      <button className="pexso_btn" onClick={onStart}>
        Начать игру
      </button>
    );
  } else {
    return (
      <>
        <button className="pexso_btn" onClick={onEnd}>
          Завершить игру
        </button>
        <p className="pexso_score">Счет: {score}</p>
        <p className="pexso_timer">Время: {timer}</p>
      </>
    );
  }
}

function Game() {
  const [columns, setColumns] = useState(initialState);
  const [gameState, setGameState] = useState("Ready");
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);

  function onStart() {
    setColumns(initialState);
    setGameState("Play");
    setTimer(60);
    setScore(0);
    setTimerStatus(true);
  }

  function onEnd() {
    setGameState("Ready");
    setTimer(60);
    setTimerStatus(false);
  }

  useEffect(() => {
    if (!timerStatus || gameState === "Ready") return;
    if (timer === 0) {
      setTimerStatus(false); //подумать, пожно ли вызвать функциюю OnEnd
    }
    const id = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, gameState, timerStatus]);

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    const sourceColumn = [...columns[source.droppableId]];
    const destinationColumn = [...columns[destination.droppableId]];
    const currentHero = sourceColumn[source.index];
    const invalidUnivers = currentHero.comics !== destination.droppableId;

    if (!invalidUnivers) {
      const [removed] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, removed);
      console.log(sourceColumn, destinationColumn);
    }
    setColumns({
      ...columns,
      [destination.droppableId]: destinationColumn,
      [source.droppableId]: sourceColumn,
    });
  }

  return (
    <>
      <Menu
        timer={timer}
        score={score}
        gameState={gameState}
        onStart={onStart}
        onEnd={onEnd}
      ></Menu>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="allColumns">
          <Column id={"marvel"} heroes={columns.marvel}></Column>
          <Column id={"center"} heroes={columns.center}></Column>
          <Column id={"dc"} heroes={columns.dc}></Column>
        </div>
      </DragDropContext>
    </>
  );
}

export default Game;
