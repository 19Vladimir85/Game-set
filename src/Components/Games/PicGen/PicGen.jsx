import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import "./PicGen.css";

const url = "http://shibe.online/api/shibes?count=";

function PicGen() {
  function getPic(picQuantity) {
    return fetch(url + picQuantity).then((response) => response.json());
  }

  function getPicQuantity(e) {
    getPic(numbersOfPic).then((data) => setPictursLink(data));
    e.preventDefault();
  }
  const [pictursLink, setPictursLink] = useState([]);
  const [numbersOfPic, setNumbersOfPic] = useState(1);
  // useEffect(() => {
  //   getPic().then((data) => setPictursLink(data));
  // }, []);
  return (
    <>
      <Header></Header>
      <div className="game">
        <div className="wrap">
          <div className="form">
            <p>Укажите количество картинок:</p>

            <input
              type="text"
              id="quantity"
              size="40"
              defaultValue={numbersOfPic}
              onChange={(e) => setNumbersOfPic(+e.target.value)}
            />
            <button onClick={getPicQuantity}>Показать</button>
          </div>

          <form onSubmit={(e) => getPicQuantity(e)}>
            <input
              type="text"
              onChange={(e) => setNumbersOfPic(+e.target.value)}
            />
            <button type="submit">Показать</button>
          </form>
          {pictursLink.map((link) => (
            <div key={link} className="img">
              <img className="image_pic" src={link} alt="img" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default PicGen;
