import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import homeLogo from "../../images/home.png";
import cartLogo from "../../images/cart.png";
import { useStateValue } from "../../../StateProvider/StateProvider";
import { Dropdown } from "react-bootstrap";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import { SettingsBackupRestoreTwoTone } from "@mui/icons-material";

function Header() {
  const [{ user }] = useStateValue();

  // Get Local Storage
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    const getBasket = () => {
      setBasket(JSON.parse(localStorage.getItem("basket")));
    };
    setBasket(JSON.parse(localStorage.getItem("basket")));
    window.addEventListener("storage", getBasket);
    return () => {
      window.removeEventListener("storage", getBasket);
    };
  }, []);

  const countItem = (basket) => {
    let itemCnt = 0;
    basket?.forEach((item) => {
      itemCnt += item.number;
    });
    return itemCnt;
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("user is signout");
      })
      .catch((error) => {
        console.error(error);
      });
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
            <div className="header__containerCartNumber">
              {countItem(basket)}
            </div>
          </Link>
          {/* Login */}
          {user === null ? (
            <Link to="/login">
              <button type="button" className="header__containerLinkButton">
                Login
              </button>
            </Link>
          ) : (
            <div className="header__dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {user.displayName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={signout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
