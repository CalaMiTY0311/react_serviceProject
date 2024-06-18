import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import useAuthStore from "../../store/authStore";

import ProfileCard from "./ProfileCard";
import ProfilePosts from "./ProfilePosts";
// import ProfilePosts from "./ProfilePosts";

const ProfilePage = () => {

	const { username } = useParams();
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);

	const authUser = useAuthStore((state) => state.user);
	console.log(authUser)

	const userNotFound = !userProfile
	if (userNotFound) return <UserNotFound />;

	return (
		<div className="h-screen overflow-y-scroll bg-white">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
				<div className="post p-5 lg:p-1 rounded-md">
					<div className="lg:fixed lg:top-7 lg:left-14 lg:w-3/12 md:fixed md:w-5/12">
						<ProfileCard />
						{/* <ProfilePosts /> */}
					</div>
				</div>
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