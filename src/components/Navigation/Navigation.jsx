import "./Navigation.scss";
import Logo from "../../assets/Logo/InStock-Logo.svg?react";

export const Navigation = () => {
  return (
    <>
      <nav>
        <div className="nav__container">
          <Logo />
          <div className="nav__menu">
            <button className="nav__btn">Warehouses</button>
            <button className="nav__btn--active">Inventory</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
