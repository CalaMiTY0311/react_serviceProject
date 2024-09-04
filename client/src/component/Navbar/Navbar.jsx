import { useState } from "react";
import { useCart } from "../../store/Store";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
// import SlidingCart from "./AuthBar";

import "./Navbar.css";
import AuthBar from "./AuthBar";
import axios from 'axios';
import Cookies from 'js-cookie';

function Navbar() {
  const [showCart, setShowCart] = useState(false);

  function toggleShowCart() {
    setShowCart(!showCart);
  }

  return (
    <header className={`header ${showCart ? "visible" : ""}`}>
      <Navigations toggleShowCart={toggleShowCart} />
      <AuthBar toggleShowCart={toggleShowCart} />
      <CartSliderOverlay />
    </header>
  );
}

function CartButton({ toggleShowCart }) {
  const cart = useCart();

  const totalCartQty = cart.reduce((totalQty, current) => {
    return totalQty + current.qty;
  }, 0);

  return (
    <span onClick={toggleShowCart} className="cart-icon">
      <ShoppingCart size={22} />
      <div className="cart-counter">{totalCartQty}</div>
    </span>
  );
}

function Navigations({ toggleShowCart }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleOpenNavigation() {
    setIsNavOpen(!isNavOpen);
  }

  const handleGetToken = async () => {
    try {
        // 쿠키를 포함시키기 위해 withCredentials 설정
        const response = await axios.get('http://localhost:5050/new_token', {
            withCredentials: true, // 쿠키를 전송하기 위해
        });

        console.log('Refresh Token:', response.data.refreshToken);
    } catch (error) {
        console.error('Error getting token:', error);
    }
};

  return (
    <nav className={`nav container 
    ${isNavOpen ? "nav-open" : ""}`}
    >
      <span className="brand-name">
        <Link to="/">Ace Store</Link>
      </span>
      <ul className="nav-link_container">
        <li className="nav-link">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-link">
          {/* <NavLink to="/explore/all">Explore All</NavLink>
           */}
           <button onClick={handleGetToken}>sdfsdf</button>
        </li>
        <li className="nav-link">
          <NavLink to="/models/all">Models</NavLink>
        </li>
      </ul>
      <div className="nav-secondary_btn" onClick={handleOpenNavigation}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="nav-secondary">
        <CartButton toggleShowCart={toggleShowCart} />
      </div>
      <div className="nav-overlay"></div>
    </nav>
  );
}

function CartSliderOverlay() {
  return <div className="cart-slide_overlay"></div>;
}

export default Navbar;
