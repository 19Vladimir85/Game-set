import Cards from "../Cards/Cards";
import { games } from "../../Utils/Consts";
import "./MainPage.css";
import Header from "../Header/Header";

function MainPage() {
  return (
    <>
      <Header></Header>
      <div className="catalog">
        {games.map((item) => (
          <Cards {...item} key={item.name}></Cards>
        ))}
      </div>
    </>
  );
}

export default MainPage;
