import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../config/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}

			const updatedUser = {
				...authUser,
				// fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				twitterURL: inputs.twitterURL !== undefined ? inputs.twitterURL : authUser.twitterURL,
				instagramURL: inputs.instagramURL !== undefined ? inputs.instagramURL : authUser.instagramURL,
				facebookURL: inputs.facebookURL !== undefined ? inputs.facebookURL : authUser.facebookURL,
				githubURL: inputs.githubURL !== undefined ? inputs.githubURL : authUser.githubURL,
				profilePicURL: URL || authUser.profilePicURL,
			};
			console.log(updatedUser)
			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);	
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");

			setIsUpdating(false);
		} catch (error) {
			showToast("Error", error.message, "error");
			console.log(error)
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;