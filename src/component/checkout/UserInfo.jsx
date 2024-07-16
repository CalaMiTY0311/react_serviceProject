import React from "react";
import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import "./UserInfo.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "@chakra-ui/react";

function UserInfo() {
  return (
    <div className="user-info_container">
      <br /><br />
      <ContactInformation />
      <ShippingAddress />
    </div>
  );
}

function ContactInformation() {
  return (
    <div className="contact-info_container">
      <h3>Title</h3>
      <input type="email" placeholder="Email" />
    </div>
  );
}

function ShippingAddress() {
//   const { emptyCart } = useCartActions();
//   const cart = useCart();

//   let navigate = useNavigate();

//   function checkoutHandler() {
//     if (cart.length < 1) {
//       toast.error("Your shopping list is Emtpy");
//       return;
//     }
//     let totalPrice = cart.reduce((acc, cur) => {
//       return acc + cur.qty * cur.price;
//     }, 0);
//     if (totalPrice < 1) {
//       toast.error("Cannot process order value of zero(0).");
//       return;
//     }

//     emptyCart();
//     toast.success("Checked out");
//     // navigate("/");
//   }

  return (
    <div className="shipping-address_container">
      <h3>Shipping Address</h3>
      <div className="shipping-address_wrapper">
      <Input
          placeholder="Enter text here"
          size="lg"
          width="400px"
          height="50px"
          fontSize="1.5rem"
        />
        {/* <input type="name" placeholder="Last name" id="lastname" />
        <input type="name" placeholder="Address" id="address" />
        <input type="name" placeholder="City" id="city" /> */}
        <button className="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
