import { ShoppingCart, X } from "phosphor-react";
import { Link } from "react-router-dom";
import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import toast from "react-hot-toast";
import "./SlidingCart.css";

//auth
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";


const SlidingCart = ({ toggleShowCart }) => {
  let cart = useCart();
  let { addProductQuantity, removeFromCart } = useCartActions();

  const { handleLogout, isLoggingOut } = useLogout();
	const authUser = useAuthStore((state) => state.user);

  return (
    <div className={`sliding-cart_container`}>
      <CartTop toggleShowCart={toggleShowCart} authUser={authUser} />
      <CartMain
        cart={cart}
        addProductQuantity={addProductQuantity}
        removeFromCart={removeFromCart}
        authUser={authUser}
      />
      <CartCheckOut 
          // cart={cart} toggleShowCart={toggleShowCart} 
          authUser={authUser} />
    </div>
  );
}

const CartTop = ({ toggleShowCart, authUser }) => {
  return (
    <div className="cart-top">
      <ShoppingCart size={22} />
      { authUser ? (
        <h2>Hi {authUser.username}</h2>
       ) : (
        <h2>Anonymous</h2>
       )}
      {/* <h2>Your Shopping Carts</h2> */}
      <div className="close-shopping-cart" onClick={toggleShowCart}>
        <X size="22px" />
      </div>
    </div>
  );
}

function CartMain({ authUser }) {

  return (
    <div className="cart-main_container">
      { authUser ? (
        <>
      <div className="cart-product">
        <div style={{ textAlign: "center", fontSize: "1.9rem" }}>
            My Profile
         </div>
      </div>
      <div className="cart-product">
      <div style={{ textAlign: "center", fontSize: "1.9rem" }}>
          Setting
       </div>
    </div>
    </>
    ) : (
      <div className="cart-product">
      </div>
    )}
      {/* <div className="cart-product">
        <div style={{ textAlign: "center", fontSize: "1.9rem" }}>
            My Profile
         </div>
      </div> */}
    </div>
  );
}

function CartCheckOut({ cart, toggleShowCart, authUser }) {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <div className="cart-checkout_container">
      {/* <h3>Checkout</h3>
      <p>${totalPrice.toFixed(2)}</p> */}
      { authUser ? (
        <Link to="/" onClick={handleLogout}>
          Logout
      </Link>
      ) : (
        <Link to="/auth">
          Login
      </Link>
      )}
      {/* <Link to="checkout" onClick={toggleShowCart}>
        Go to Checkout
      </Link> */}
    </div>
    // <></>
  );
}

export default SlidingCart;
