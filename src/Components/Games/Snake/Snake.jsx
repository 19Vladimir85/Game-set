import { useEffect, useState } from "react";
import "./Snake.css";
import Header from "../../Header/Header";
import AppleImg from "./photo_2023-05-04_11-29-12.jpg";

const initialSnake = [[10, 10]];
const initialWay = [0, -1];
const initialApple = [5, 10];
const initialDelay = 300;

function Snake() {
  const [score, setScore] = useState(0);
  const [apple, setApple] = useState(initialApple);
  const [snake, setSnake] = useState(initialSnake);
  const [way, setWay] = useState(initialWay);
  const [gameOver, setGameOver] = useState(false);
  const [delay, setDelay] = useState(null);
  useEffect(() => {
    const fruit = document.getElementById("apple");
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "green";
      ctx.setTransform(50, 0, 0, 50, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      snake.forEach((item) => ctx.fillRect(item[0], item[1], 1, 1));
    }
  }, [snake, apple]);

  useEffect(() => {
    if (gameOver || delay === null) return;
    const id = setTimeout(runGame, delay);
    return () => clearTimeout(id);
  }, [gameOver, runGame, delay]);

  function play() {
    setScore(0);
    setApple(initialApple);
    setSnake(initialSnake);
    setWay(initialWay);
    setGameOver(false);
    setDelay(initialDelay);
  }

  function changeWay(event) {
    console.log(event, event.key);
    switch (event.key) {
      case "ArrowUp":
        setWay([0, -1]);
        break;
      case "ArrowDown":
        setWay([0, 1]);
        break;
      case "ArrowRight":
        setWay([1, 0]);
        break;
      case "ArrowLeft":
        setWay([-1, 0]);
        break;
      default:
        break;
    }
  }

  function eatApple(point) {
    if (point[0] === apple[0] && point[1] === apple[1]) {
      let newAppleCoordinate = apple.map(() =>
        Math.floor((Math.random() * 1000) / 50)
      );
      setDelay(delay + 10);
      setApple(newAppleCoordinate);
      setScore(score + 1);
      return true;
    }
    return false;
  }

  function checkCollision(head) {
    if (head[0] > 19 || head[1] > 19 || head[0] < 0 || head[1] < 0) {
      return true;
    }
    for (let square of snake) {
      if (square[0] === head[0] && square[1] === head[1]) {
        return true;
      }
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHeadX = newSnake[0][0] + way[0];
    const newSnakeHeadY = newSnake[0][1] + way[1];
    const newSnakeHead = [newSnakeHeadX, newSnakeHeadY];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setGameOver(true);
    }
    if (!eatApple(newSnakeHead)) {
      newSnake.pop();
    }
    setSnake(newSnake);
    setDelay(300);
  }

  return (
    <>
      <Header></Header>
      <div
        tabIndex="0"
        onClick={() => changeWay("ArrowUp")}
        onKeyDown={(e) => changeWay(e)}
        className="wrapper"
      >
        <img
          className="apple_img"
          id="apple"
          alt="img"
          src={AppleImg}
          width={"10px"}
        />
        <button className="play_btn" onClick={play}>
          Играть
        </button>
        <div className="score">Счет: {score}</div>
        <canvas id="canvas" className="canvas" width="1000px" height="1000px" />
      </div>
    </>
  );
}
export default Snake;
