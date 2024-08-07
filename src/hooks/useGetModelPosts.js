import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase-config";


const useGetModelPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();

	useEffect(() => {
		const getModelPosts = async () => {
			setIsLoading(true);
			// if (authUser.following.length === 0) {
			// 	setIsLoading(false);
			// 	setPosts([]);
			// 	return;
			// }

            // const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
			const q = query(collection(firestore, "posts"));
			try {
				const querySnapshot = await getDocs(q);

                console.log(querySnapshot)
				const feedPosts = [];
                console.log("feedPosts : ", feedPosts)
				querySnapshot.forEach((doc) => {
					feedPosts.push({ id: doc.id, ...doc.data() });
				});

				feedPosts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(feedPosts);
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

export default useGetModelPosts;