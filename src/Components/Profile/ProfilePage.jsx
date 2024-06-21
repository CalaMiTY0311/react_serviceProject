import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
// import EditProfile from "./EditProfile";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import ProfileBody from "./ProfileBody";

const ProfilePage = () => {
	const { username } = useParams();
	console.log(username)
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
	console.log(userProfile)
	const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound />;

	return (
		<>
			{!isLoading && userProfile && <ProfileBody />}
			{isLoading && <div>sdfsdf</div>}
			{/* <ProfileBody /> */}
		</>
	);
};

export default ProfilePage;

// skeleton for profile header
// const ProfileHeaderSkeleton = () => {
// 	return (
// 		<Flex
// 			gap={{ base: 4, sm: 10 }}
// 			py={10}
// 			direction={{ base: "column", sm: "row" }}
// 			justifyContent={"center"}
// 			alignItems={"center"}
// 		>
// 			<SkeletonCircle size='24' />

// 			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
// 				<Skeleton height='12px' width='150px' />
// 				<Skeleton height='12px' width='100px' />
// 			</VStack>
// 		</Flex>
// 	);
// };

const UserNotFound = () => {
	return (
		// <Flex flexDir='column' textAlign={"center"} mx={"auto"}>
		// 	<Text fontSize={"2xl"}>User Not Found</Text>
		// 	<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
		// 		Go home
		// 	</Link>
		// </Flex>
		<div>no profile</div>
	);
};