import "./Navigation.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/InStock-Logo.svg?react";

export const Navigation = () => {
  return (
    <>
      <nav>
        <div className="nav__container">
          <Link to={"/"}>
            <Logo />
          </Link>
          <div className="nav__menu">
            <Link to={"/warehouse"}><button className="nav__btn">Warehouses</button></Link>
            <Link to={"/inventory"}><button className="nav__btn--active">Inventory</button></Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
