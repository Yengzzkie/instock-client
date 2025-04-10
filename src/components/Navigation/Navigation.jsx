import "./Navigation.scss";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/InStock-Logo.svg?react";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <Logo />
        </Link>
        <div className="nav__menu">
          <Link to="/warehouse">
            <button
              className={
                location.pathname.startsWith("/warehouse")
                  ? "nav__btn nav__btn--active"
                  : "nav__btn"
              }
            >
              Warehouses
            </button>
          </Link>
          <Link to="/inventory">
            <button
              className={
                location.pathname.startsWith("/inventory")
                  ? "nav__btn nav__btn--active"
                  : "nav__btn"
              }
            >
              Inventory
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
