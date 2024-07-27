import React, { useState } from "react";

import PostForm from "./PostForm";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";

const CreatePost = () => {

    const [inputs, setInputs] = useState({
        title: "",
        body: "",
    });

    const [category, setCategory] = useState({
        gender: {
          Male: false,
          Female: false,
          Other: false,
        },
        categories: {
          Vtuber: false,
          Actor: false,
        }
      });

        const handleSelectCategory = (type, name) => {
    setCategory(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [name]: !prevState[type][name]
      }
    }));
  };

    const { handleCreatePost } = useCreatePost(inputs,category);

    return (
        <>
        <PostForm inputs={inputs} setInputs={setInputs}
        category={category}  handleSelectCategory={handleSelectCategory} 
        handleCreatePost={handleCreatePost} />
        </>
    )    
}

export default CreatePost;



function useCreatePost(inputs, category) {
    const authUser = useAuthStore((state) => state.user);

    const handleCreatePost = () => {
        const newPost = {
			title: inputs.title,
            body: inputs.body,
            category: category,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};
        console.log(newPost)
    }
    return { handleCreatePost }
}