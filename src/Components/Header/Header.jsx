import "./Header.css";

function Header() {
  return (
    <div className="header">
      <a className="main_logo" href="/">
        MINI GAMES
      </a>
      <button className="statistics">STATISTICS</button>
      <button className="enter">ВОЙТИ</button>
    </div>
  );
}

export default Header;
