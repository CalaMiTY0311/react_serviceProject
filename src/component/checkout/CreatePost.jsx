import React, { useRef, useState } from "react";
import "./CreatePost.css";

import { Link, useNavigate } from "react-router-dom";

import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore"
import useUserProfileStore from "../../store/userProfileStore";
import usePreviewImg from "../../hooks/usePreviewImg";

import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { useLocation } from "react-router-dom";

import ModalForm from "./ModalForm";

import {
  Input, Textarea, Radio, Stack, Button
} from "@chakra-ui/react";

const CreatePost = () => {

// 포스트 제목 본문 모델다운로드링크
    const [inputs, setInputs] = useState({
      title: "",
      body: "",
      fileURL:"",
  });

// 링크 or 업로드 선택
  const [uploadOption, setuploadOption] = useState(true);
  const handleUploadOption = () => {
    setuploadOption((prev) => !prev);
  };

  // 카테고리
  const [category, setCategory] = useState({
          // 성별
          Male: false,
          Female: false,
          Other: false,

          // 기타 카테고리
          Vtuber: false,
          Actor: false,
  });

const handleSelectCategory = (name) => {
    setCategory(prevState => ({
        ...prevState,
        [name]: !prevState[name]
    }));
};

// 포스트 이미지
const imageRef = useRef(null);
const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

// 업로드 함수
const { isLoading, handleCreatePost } = useCreatePost();

    const handlePostCreation = async () => {
		try {
			await handleCreatePost(selectedFile, inputs, category);
			// onClose();
			setSelectedFile(null);
		} catch (error) {
			// showToast("Error", error.message, "error");
      console.log(error.message)
		}
	};

  return (
    <>
      <div className="user-info_container">
        <br /><br />
        <div className="contact-info_container">
          <h3>Title</h3>
          <Input placeholder='large size' size='lg' height="25px" onChange={(e) => setInputs({ ...inputs, title: e.target.value })} />
        <br />
        <ModalForm
          category={category} handleSelectCategory={handleSelectCategory}
          handleImageChange={handleImageChange} selectedFile={selectedFile} setSelectedFile={setSelectedFile} imageRef={imageRef}
        />
        <Stack direction="row" spacing={5}>
              <Radio
                isChecked={uploadOption}
                size='lg'
                onChange={handleUploadOption}
              >
                URL
              </Radio>
              <Radio
                isChecked={!uploadOption}
                size='lg'
                onChange={handleUploadOption}
              >
                Upload
              </Radio>
            </Stack>
          <h3> URL Or Upload</h3>
            <Input placeholder='large size' size='lg' height="25px" onChange={(e) => setInputs({ ...inputs, fileURL: e.target.value })} />
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
            {/* <button className="checkout-btn" onClick={handlePostCreation}>
              Checkout
            </button> */}
            <Button
              className="checkout-btn"
              onClick={handlePostCreation}
              isLoading={isLoading}
              colorScheme="teal"
              variant="solid"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreatePost;

function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  setUserProfile(authUser)
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);

	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, inputs, category) => {

		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);
		const newPost = {
            title: inputs.title,
            body: inputs.body,
            category: category,
            likes: [],
            comments: [],
            Link:inputs.fileURL,
            createdAt: Date.now(),
            createdBy: authUser.uid,
        };

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;
      console.log(newPost)

      console.log(authUser.uid)
      // console.log(userProfile.uid)
			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id })
			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });
      
      // createPost({ ...newPost, id: postDocRef.id })
      // addPost({ ...newPost, id: postDocRef.id })

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
      console.log(error)
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}