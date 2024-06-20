import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
// import useFollowUser from "../../hooks/useFollowUser";

const ProfileButton = () => {
	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

	return (
		<>
		{visitingOwnProfileAndAuth && (
			<Button className="bg-gray-900 w-fit lg:ml-auto">Edit Profile</Button>
		  )}
		  {visitingAnotherProfileAndAuth && (
			<Button className="bg-blue-500 w-fit lg:ml-auto">Following</Button>
		  )}
		</>
	);
};

export default ProfileButton;