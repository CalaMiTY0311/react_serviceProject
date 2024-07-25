import React, { useRef } from "react";
import "./PostForm.css";

import usePreviewImg from "../../hooks/usePreviewImg";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import ModalForm from "./PostModal";

import {
  Input, Textarea,
} from "@chakra-ui/react";

function PostForm({inputs, setInputs, category, handleSelectCategory, handleCreatePost}) {

//   const [inputs, setInputs] = useState({
//     title: "",
//     body: "",
// });

  // const [category, setCategory] = useState({
  //   gender: {
  //     Male: false,
  //     Female: false,
  //     Other: false,
  //   },
  //   categories: {
  //     Vtuber: false,
  //     Actor: false,
  //   }
  // });

  // const handleSelectCategory = (type, name) => {
  //   setCategory(prevState => ({
  //     ...prevState,
  //     [type]: {
  //       ...prevState[type],
  //       [name]: !prevState[type][name]
  //     }
  //   }));
  // };

  // const handleCreatePost = () => {
  //   const newPost = {
  //     title: inputs.title,
  //     body: inputs.body,
  //     likes: [],
  //     comments: [],
  //     category: category,
  //     createdAt: Date.now(),
  //     // createdBy: authUser.uid,
  //   };
  //   console.log(newPost)
  // }

  return (
    <>
      <div className="user-info_container">
        <br /><br />
        <div className="contact-info_container">
        <h3>Title</h3>
        <Input placeholder='large size' size='lg' height="25px"  onChange={(e) => setInputs({ ...inputs, title: e.target.value })}/>
      </div>
      <ModalForm 
      category={category}
      handleSelectCategory={handleSelectCategory}
      />
      <div className="shipping-address_container">
        <h3>Shipping Address</h3>
        <div className="shipping-address_wrapper">
          <Textarea
            placeholder="Enter text here"
            size="lg"
            // width="400px"
            height="304px" // Increased height for larger textarea
            fontSize="1.5rem"
            resize="none" // Disable resize
            onChange={(e) => setInputs({ ...inputs, body: e.target.value })}
          />
          <button className="checkout-btn" onClick={handleCreatePost}>
            Checkout
          </button>
        </div>
      </div>
      </div>
    </>
  );
}



export default PostForm;
