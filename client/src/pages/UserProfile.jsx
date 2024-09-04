import React from "react";
// import ProfilePage from "../component/profile/profilePage";
import Profile from "../component/profile/profile";
import useGetUserProfileByUsername from "../hooks/useGetUserProfileByUsername";
import { Flex, Text } from "@chakra-ui/react";
import { Link ,useParams } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {

  const { username } = useParams();
  console.log(username)
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
    const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound />;

  return (
    <div>
        {!isLoading && userProfile && <Profile />}
		{isLoading && <Profilewait />}
    </div>
  );
}

export default UserProfile;

const Profilewait = () => {
	return (
		<div>wait</div>
	);
};

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text fontSize={"2xl"}>User Not Found</Text>
			<Link to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
        // <Link to='/'>

        // </Link>
	);
};