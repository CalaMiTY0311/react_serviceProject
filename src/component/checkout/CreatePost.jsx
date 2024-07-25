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

      const handleCreatePost = () => {
        const newPost = {
          title: inputs.title,
          body: inputs.body,
          likes: [],
          comments: [],
          category: category,
          createdAt: Date.now(),
          // createdBy: authUser.uid,
        };
        console.log(newPost)
      }

    return (
        <>
        <PostForm inputs={inputs} setInputs={setInputs}
        category={category}  handleSelectCategory={handleSelectCategory} 
        handleCreatePost={handleCreatePost} />
        </>
    )    
}

export default CreatePost;

// function useCreatePost() {
// 	const showToast = useShowToast();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const authUser = useAuthStore((state) => state.user);
// 	const createPost = usePostStore((state) => state.createPost);
// 	const addPost = useUserProfileStore((state) => state.addPost);
// 	const userProfile = useUserProfileStore((state) => state.userProfile);
// 	const { pathname } = useLocation();

// 	const handleCreatePost = async (selectedFile, caption) => {
// 		if (isLoading) return;
// 		if (!selectedFile) throw new Error("Please select an image");
// 		setIsLoading(true);
// 		const newPost = {
// 			caption: caption,
// 			likes: [],
// 			comments: [],
// 			createdAt: Date.now(),
// 			createdBy: authUser.uid,
// 		};

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