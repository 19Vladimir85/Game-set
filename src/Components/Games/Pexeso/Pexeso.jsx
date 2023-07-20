import { useEffect, useState } from "react";
import "./Pexeso.css";
import Header from "../../Header/Header";

const uniqCards = [
  {
    type: "cat1",
    image: "./images/cat1.jpeg",
  },
  {
    type: "cat2",
    image: "./images/cat2.jpeg",
  },
  {
    type: "cat3",
    image: "./images/cat3.gif",
  },
  {
    type: "cat4",
    image: "./images/cat4.jpeg",
  },
  {
    type: "cat5",
    image: "./images/cat5.png",
  },
  {
    type: "cat6",
    image: "./images/cat6.png",
  },
];

function Card({ onClick, card, index, opened, disabled }) {
  function handleClick() {
    if (disabled) return;
    onClick(index);
  }
  return (
    <div onClick={handleClick} className="card_pexeso">
      {opened ? (
        <img src={card.image} alt="img" />
      ) : (
        <img src="./images/background.png" alt="img" />
      )}
    </div>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function Pexeso() {
  const [cards, setCards] = useState(shuffle(uniqCards.concat(uniqCards)));
  const [opened, setOpened] = useState([]);
  const [twoCardsOpened, setTwoCardsOpened] = useState(false);
  const [foundCards, setFoundCards] = useState([]);
  const [steps, setSteps] = useState(0);
  const [finishGame, setFinishGame] = useState("");

  // function shuffle(arr) {
  //   for (let i = arr.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     [arr[i], arr[j]] = [arr[j], arr[i]];
  //   }
  //   return arr;
  // }

  // function shuffle(array) {
  //   let currentIndex = array.length,
  //     temporaryValue,
  //     randomIndex;

  //   while (currentIndex !== 0) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // }

  // useEffect(() => {
  //   setCards(shuffle(cards));
  // }, []);

  function newGame() {
    setCards(shuffle(cards));
    setOpened([]);
    setTwoCardsOpened(false);
    setFoundCards([]);
    setSteps(0);
    setFinishGame("");
  }

  function clickCard(cardIndex) {
    setOpened([...opened, cardIndex]);
    if (opened.length === 1) {
      setTwoCardsOpened(true);
    }
  }
  function isOpend(cardIndex) {
    return opened.includes(cardIndex);
  }
  function checkPair() {
    const [first, second] = opened;
    if (cards[first].type === cards[second].type) {
      setTimeout(() => {
        setOpened([]);
        setTwoCardsOpened(false);
        setFoundCards([...foundCards, cards[first].type]);
        setSteps(steps + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setOpened([]);
        setTwoCardsOpened(false);
        setSteps(steps + 1);
      }, 500);
    }
  }
  function isFound(type) {
    return foundCards.includes(type);
  }

  useEffect(() => {
    if (uniqCards.length === foundCards.length) {
      setFinishGame("Игра окончена!");
    }
  }, [foundCards]);

  // массив зависимости?

  useEffect(() => {
    if (opened.length === 2) {
      checkPair();
    }
  }, [opened]);

  return (
    <>
      <Header></Header>
      <button className="pexso_btn" onClick={newGame}>
        Новая игра
      </button>
      <p className="steps">Количество шагов: {steps}</p>
      <p className="finishGame">{finishGame}</p>
      <div className="card_zone">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              onClick={clickCard}
              card={card}
              index={index}
              opened={isOpend(index) || isFound(card.type)}
              disabled={twoCardsOpened}
            ></Card>
          );
        })}
      </div>
    </>
  );
}

export default Pexeso;
