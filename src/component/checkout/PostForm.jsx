import React, { useRef, useState } from "react";
import "./PostForm.css";

import usePreviewImg from "../../hooks/usePreviewImg";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { ChakraProvider, Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ModalForm from "./PostModal";

import {
  Input, Textarea,
} from "@chakra-ui/react";

function PostForm({ inputs, setInputs, category, fileLink, setFileLink, handleSelectCategory, handleCreatePost,
                    handleImageChange, selectedFile,  setSelectedFile, imageRef,
                    handlePostCreation }) {


  return (
    <>
      <div className="user-info_container">
        <br /><br />
        <div className="contact-info_container">
          <h3>Title</h3>
          <Input placeholder='large size' size='lg' height="25px" onChange={(e) => setInputs({ ...inputs, title: e.target.value })} />
        <br />
        <ModalForm
          category={category}
          fileLink={fileLink} setFileLink={setFileLink}
          handleSelectCategory={handleSelectCategory}
          handleImageChange={handleImageChange} selectedFile={selectedFile} setSelectedFile={setSelectedFile} imageRef={imageRef}
        />
        </div>
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
            <button className="checkout-btn" onClick={handlePostCreation}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}



export default PostForm;
