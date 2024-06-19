import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Link } from "react-router-dom"; 
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import useAuthStore from "../../store/authStore";

import ProfileCard from "./ProfileCard";
import ProfilePosts from "./ProfilePosts";

import EditProfile from "./EditProfile";

const ProfilePage = () => {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { username } = useParams();
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);

	const authUser = useAuthStore((state) => state.user);

	const userNotFound = !userProfile
	if (userNotFound) return <UserNotFound />;

	return (
		<div className="h-screen overflow-y-scroll bg-white">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
						<ProfileCard />
						<ProfilePosts />
			</div>
		</div>
			);
		};


export default ProfilePage;

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text fontSize={"2xl"}>User Not Found</Text>
			<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};