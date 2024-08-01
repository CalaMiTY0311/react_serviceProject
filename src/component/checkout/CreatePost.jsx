import React, { useState } from "react";

import PostForm from "./PostForm";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import usePreviewImg from "../../hooks/usePreviewImg";

import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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

    const [fileLink, setFileLink] = useState({
        downloadURL:""
    })

    const handleSelectCategory = (type, name) => {
        setCategory(prevState => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                [name]: !prevState[type][name]
            }
        }));
    };

    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

    const { handleCreatePost } = useCreatePost(inputs, category, fileLink);
    const imageRef = useRef(null);

    return (
        <>
            <PostForm inputs={inputs} setInputs={setInputs}
                category={category} handleSelectCategory={handleSelectCategory}
                fileLink={fileLink} setFileLink={setFileLink}
                handleCreatePost={handleCreatePost} 
                handleImageChange={handleImageChange} selectedFile={selectedFile} setSelectedFile={setSelectedFile} imageRef={imageRef}/>
        </>
    )
}

export default CreatePost;

const handleCreatePost = async (selectedFile, caption) => {
function useCreatePost(inputs, category, fileLink) {
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
    const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

    if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);

    const handleCreatePost = () => {
        const newPost = {
            title: inputs.title,
            body: inputs.body,
            category: category,
            likes: [],
            comments: [],
            downloadURL:fileLink.downloadURL,
            createdAt: Date.now(),
            createdBy: authUser.uid,
        };
        console.log(newPost)
    }
    return { handleCreatePost }
}
}