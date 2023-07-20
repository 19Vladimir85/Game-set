import { Link } from "react-router-dom";
import "./Cards.css";

function Cards({ icon, name, page, description }) {
  return (
    <Link to={page}>
      <div className="card">
        <img className="card_image" src={icon} alt="img" />
        <a href="url">{name}</a>
        <a href="url">{description}</a>
      </div>
    </Link>
  );
}
export default Cards;
