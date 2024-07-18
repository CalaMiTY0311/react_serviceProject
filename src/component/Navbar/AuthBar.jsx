import { ShoppingCart, X } from "phosphor-react";
import { Link } from "react-router-dom";
import "./AuthBar.css";

//auth
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";


const AuthBar = ({ toggleShowCart }) => {
	const authUser = useAuthStore((state) => state.user);

  return (
    <div className={`sliding-cart_container`}>
      <TopBar
      toggleShowCart={toggleShowCart} 
      authUser={authUser} />
      <MainBar
        toggleShowCart={toggleShowCart}
        authUser={authUser}
      />
      <BottomBar
          // cart={cart} toggleShowCart={toggleShowCart} 
          authUser={authUser} />
    </div>
  );
}

const TopBar = ({ toggleShowCart,authUser }) => {
  return (
    <div className="cart-top">
      <ShoppingCart size={22} />
      { authUser ? (
        <h2>Hi {authUser.username}</h2>
       ) : (
        <h2>Anonymous</h2>
       )}
      <div className="close-shopping-cart" 
        onClick={toggleShowCart}
      >
        <X size="22px" />
      </div>
    </div>
  );
}

function MainBar({ toggleShowCart, authUser }) {

  return (
    <div className="cart-main_container">
      { authUser ? (
        <>
      <Link to={`/profile/${authUser?.username}`} className="cart-product">
        <div style={{ textAlign: "center", fontSize: "1.9rem" }}>
            My Profile
         </div>
      </Link>
      <div className="cart-product">
      <div style={{ textAlign: "center", fontSize: "1.9rem" }}>
          Setting
       </div>
    </div>
    <Link to='/modelPost' className="cart-product" onClick={toggleShowCart}>
        <div style={{ textAlign: "center", fontSize: "1.9rem" }}>
            Model Post
         </div>
      </Link>
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

function BottomBar({ authUser }) {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <div className="cart-checkout_container">
      { authUser ? (
        <Link to="/" onClick={handleLogout}>
          Logout
      </Link>
      ) : (
        <Link to="/login">
          Login / Signup
      </Link>
      )}
      {/* <Link to="checkout" onClick={toggleShowCart}>
        Go to Checkout
      </Link> */}
    </div>
  );
}

export default AuthBar;
