import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import { Timestamp } from 'firebase/firestore';

const useGetModelPostDetail = (createdAt) => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();

	const datatime = Number(createdAt)

	useEffect(() => {
		const getModelPosts = async () => {
			setIsLoading(true);

			const q = query(collection(firestore, "posts"), where("createdAt", "==", datatime));
			try {
				const querySnapshot = await getDocs(q);
				const feedPost = [];

				querySnapshot.forEach((doc) => {
					feedPost.push({ id: doc.id, ...doc.data() });
				});

				setPosts(feedPost);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getModelPosts();
	}, [authUser, showToast, setPosts, setUserProfile]);

	return { isLoading, posts };
};

export default useGetModelPostDetail;