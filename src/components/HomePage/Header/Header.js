import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import homeLogo from "../../images/home.png";
import cartLogo from "../../images/cart.png";
import { useStateValue } from "../../../StateProvider/StateProvider";

function Header() {
  const [{ basket }] = useStateValue();

  const countItem = (basket) => {
    let itemCnt = 0;
    basket.forEach((item) => {
      itemCnt += item.number;
    });
    return itemCnt;
  };

  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header__containerLogo">
          <h1>E-SHOP</h1>
        </Link>
        <div className="header__containerLink">
          {/* Home */}
          <Link className="header__containerLinkHome" to="/">
            <img src={homeLogo} alt="" />
          </Link>
          {/* Cart */}
          <Link className="header__containerLinkCart" to="/checkout">
            <img src={cartLogo} alt="" />
            <div className="header__containerCartNumber">{countItem(basket)}</div>
          </Link>
          {/* Login */}
          <button type="button" className="header__containerLinkButton">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
