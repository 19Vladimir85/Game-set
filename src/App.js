import "./App.css";
import TicTacToe from "./Components/Games/Tic-Tac-Toe/Tic-Tac-Toe";
import PixelArt from "./Components/Games/Pixel-art/Pixel-art";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import PicGen from "./Components/Games/PicGen/PicGen";
import BattleShip from "./Components/Games/BattleShip/BattleShip";
import Snake from "./Components/Games/Snake/Snake";
import Pexeso from "./Components/Games/Pexeso/Pexeso";
import Heroes from "./Components/Games/Heroes/heroes";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/tic-tac-toe" element={<TicTacToe></TicTacToe>}></Route>
        <Route path="/pixel-art" element={<PixelArt></PixelArt>}></Route>
        <Route path="/pic-gen" element={<PicGen></PicGen>}></Route>
        <Route path="/battle-ship" element={<BattleShip></BattleShip>}></Route>
        <Route path="/snake" element={<Snake></Snake>}></Route>
        <Route path="/pexeso" element={<Pexeso></Pexeso>}></Route>
        <Route path="/heroes" element={<Heroes></Heroes>}></Route>

        <Route path="*" element={404}></Route>
      </Routes>
    </div>
  );
}

export default App;
