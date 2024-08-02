// import React, { useState, useRef } from "react";

// import PostForm from "./CreatePost";
// import useShowToast from "../../hooks/useShowToast";
// import useAuthStore from "../../store/authStore";
// import usePostStore from "../../store/postStore"
// import useUserProfileStore from "../../store/userProfileStore";
// import usePreviewImg from "../../hooks/usePreviewImg";

// import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
// import { firestore, storage } from "../../config/firebase-config";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";

// import { useLocation } from "react-router-dom";

// const CreatePost = () => {


//     const [fileLink, setFileLink] = useState({
//         downloadURL:""
//     })

//     const imageRef = useRef(null);

//     const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

//     const { isLoading, handleCreatePost } = useCreatePost();
//     const handlePostCreation = async () => {
// 		try {
// 			await handleCreatePost(selectedFile, inputs, fileLink, category);
// 			// onClose();
// 			setSelectedFile(null);
// 		} catch (error) {
// 			// showToast("Error", error.message, "error");
//             console.log(error.message)
// 		}
// 	};

//     return (
//         // <>
//         //     <PostForm inputs={inputs} setInputs={setInputs}
//         //         category={category} handleSelectCategory={handleSelectCategory}
//         //         fileLink={fileLink} setFileLink={setFileLink}
//         //         // handleCreatePost={handleCreatePost} 
//         //         handleImageChange={handleImageChange} selectedFile={selectedFile} setSelectedFile={setSelectedFile} imageRef={imageRef}
//         //         handlePostCreation={handlePostCreation}
//         //         />
//         // </>
//     )
// }

// export default CreatePost;

// function useCreatePost() {
// 	const showToast = useShowToast();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const authUser = useAuthStore((state) => state.user);
// 	const createPost = usePostStore((state) => state.createPost);
// 	const addPost = useUserProfileStore((state) => state.addPost);
// 	const userProfile = useUserProfileStore((state) => state.userProfile);
// 	const { pathname } = useLocation();

//     // console.log(authUser.uid)
// 	const handleCreatePost = async (selectedFile, inputs, fileLink, category) => {
// 		if (isLoading) return;
// 		if (!selectedFile) throw new Error("Please select an image");
// 		setIsLoading(true);
// 		const newPost = {
//             title: inputs.title,
//             body: inputs.body,
//             category: category,
//             likes: [],
//             comments: [],
//             modelfile:fileLink.downloadURL,
//             createdAt: Date.now(),
//             createdBy: authUser.uid,
//         };
// 		try {
// 			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
// 			const userDocRef = doc(firestore, "users", authUser.uid);
// 			const imageRef = ref(storage, `posts/${postDocRef.id}`);

// 			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
// 			await uploadString(imageRef, selectedFile, "data_url");
// 			const downloadURL = await getDownloadURL(imageRef);

// 			await updateDoc(postDocRef, { imageURL: downloadURL });

// 			newPost.imageURL = downloadURL;

// 			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

// 			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

// 			showToast("Success", "Post created successfully", "success");
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return { isLoading, handleCreatePost };
// }