// import { useEffect, useState } from "react";
// import usePostStore from "../store/postStore";
// import useAuthStore from "../store/authStore";
// import useShowToast from "./useShowToast";
// import useUserProfileStore from "../store/userProfileStore";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { firestore } from "../config/firebase-config";

// const useGetModelPosts = () => {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const { posts, setPosts } = usePostStore();
// 	const authUser = useAuthStore((state) => state.user);
// 	const showToast = useShowToast();
// 	const { setUserProfile } = useUserProfileStore();

// 	useEffect(() => {
// 		const getModelPosts = async () => {
// 			setIsLoading(true);
// 			// if (authUser.following.length === 0) {
// 			// 	setIsLoading(false);
// 			// 	setPosts([]);
// 			// 	return;
// 			// }

//             // const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
// 			const q = query(collection(firestore, "posts"));
// 			try {
// 				const querySnapshot = await getDocs(q);
// 				const feedPosts = [];
//                 // console.log("feedPosts : ", feedPosts)
// 				querySnapshot.forEach((doc) => {
// 					feedPosts.push({ id: doc.id, ...doc.data() });
// 				});
// 				console.log(feedPosts)
// 				feedPosts.sort((a, b) => b.createdAt - a.createdAt);
// 				setPosts(feedPosts);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		if (authUser) getModelPosts();
// 	}, [authUser, showToast, setPosts, setUserProfile]);

// 	return { isLoading, posts };
// };

// export default useGetModelPosts;

import axios from 'axios';
import { useEffect } from 'react';
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";

const useGetModelPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getModelPosts = async () => {
            setIsLoading(true);

            if (!authUser) {
                setIsLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const accessToken = token ? JSON.parse(token).token : null;

                if (!accessToken) {
                    showToast("Error", "No access token found", "error");
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:5050/post/modelposts', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });

                const feedPosts = response.data;
                feedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(feedPosts);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getModelPosts();
    }, [authUser, showToast, setPosts]);

    return { isLoading, posts };
};

export default useGetModelPosts;
