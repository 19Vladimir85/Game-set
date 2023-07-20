import "./Pixel-art.css";
import { CompactPicker } from "react-color";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";

function GameStarts({ handleClickStart }) {
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  return (
    <div className="home_screen">
      <button onClick={() => handleClickStart(true, width, height)}>
        Start drawing
      </button>
      <div className="main_text">Задайте ширину холста</div>
      <div className="field_width">
        <p className="width">
          Width
          <input
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            type="text"
          />
        </p>
      </div>
      <div className="field_height">
        <p className="height">
          Height
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="text"
          />
        </p>
      </div>
    </div>
  );
}

function Field({ newWidth, newHeight, selectedColor }) {
  console.log(newWidth, newHeight, selectedColor);
  const board = new Array(Number(newWidth)).fill(
    new Array(Number(newHeight)).fill(<></>)
  );
  return (
    <div>
      {board.map((row, index) => (
        <div className="row" key={index}>
          {row.map((pixel, index) => (
            <Pixel selectedColor={selectedColor} key={index}></Pixel>
          ))}
        </div>
      ))}
    </div>
  );
}

function Pixel({ selectedColor }) {
  const [pixelCurrentColor, setPixelCurrentColor] = useState("#fff");
  function pixelClick() {
    setPixelCurrentColor(selectedColor);
  }
  return (
    <div
      className="pixel"
      style={{ backgroundColor: pixelCurrentColor }}
      onClick={pixelClick}
    ></div>
  );
}

function Game() {
  const [color, setColor] = useState("red");
  const [start, setStart] = useState(false);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);

  function handleChangeColor(newColor) {
    setColor(newColor.hex);
  }
  return (
    <>
      <Header></Header>
      <Link to="/">
        <button>Назад</button>
      </Link>
      {start ? (
        <div className="pixel_game">
          {/* <div className="pixel" style={{ backgroundColor: color }}></div> */}
          <button className="btn_rest">Reset</button>
          <CompactPicker
            className="colors"
            onChangeComplete={handleChangeColor}
          ></CompactPicker>
          <button className="btn_png">Export as PNG</button>
          <div className="field_wrapper">
            <Field
              newWidth={width}
              newHeight={height}
              selectedColor={color}
            ></Field>
          </div>
        </div>
      ) : (
        <GameStarts
          handleClickStart={(newStart, newWidth, newHeight) => {
            setStart(newStart);
            setWidth(newWidth);
            setHeight(newHeight);
          }}
        ></GameStarts>
      )}
    </>
  );
}

export default Game;
