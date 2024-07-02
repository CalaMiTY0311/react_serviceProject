import React from "react";
import ProfilePage from "../component/profile/profilePage";
import useGetUserProfileByUsername from "../hooks/useGetUserProfileByUsername";
import { Link ,useParams } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {

    const { username } = useParams();
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
    const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound />;

  return (
    <div>
        {!isLoading && userProfile && <ProfilePage />}
    </div>
  );
}

export default UserProfile;

const UserNotFound = () => {
	return (
		// <Flex flexDir='column' textAlign={"center"} mx={"auto"}>
		// 	<Text fontSize={"2xl"}>User Not Found</Text>
		// 	<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
		// 		Go home
		// 	</Link>
		// </Flex>
        <Link to='/'>

        </Link>
	);
};