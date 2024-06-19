import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";

import {
    Box,
    Image,
    Heading,
    Text,
    VStack,
    HStack,
    Link,
    IconButton,
  } from '@chakra-ui/react';
//   import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';


const ProfileCard = () => {

    const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

    return (
        <div class="post p-5 lg:p-1 rounded-md">
<div className="lg:fixed lg:top-7 lg:left-14 lg:w-3/12 md:fixed md:w-5/12">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mb-4">
            {/* <!-- Banner Profile --> */}
            <div className="relative">
                <img src={authUser.profilePicURL} alt="Banner Profile" className="w-full rounded-t-lg" />
                {/* <img src={authUser.profilePicURL} alt="Profile Picture" className="absolute bottom-0 left-2/4 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white" /> */}
            </div>
            {/* <!-- User Info with Verified Button --> */}
            <div className="flex items-center mt-4">
                <h2 className="text-xl font-bold text-gray-800">{authUser.username}</h2>
                {visitingOwnProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"black"}
								color={"white"}
								_hover={{ bg: "whiteAlpha.800" }}
								size={{ base: "xs", md: "sm" }}
								onClick={onOpen}
							>
								Edit Profile
							</Button>
						</Flex>
					)}
            </div>
            {/* <!-- Bio --> */}
            <p className="text-gray-700 mt-2"> followers :  {authUser.followers.length}</p>
            <p className="text-gray-700 mt-2"> following :  {authUser.following.length}</p>
            <br />
            <p className="text-gray-700 mt-2">{authUser.bio}</p>
            {/* <!-- Social Links --> */}
            {/* <div className="flex items-center mt-4 space-x-4">
                <a href="#" className="text-blue-500 hover:underline"> Twitter </a>
                <a href="#" className="text-blue-500 hover:underline"> GitHub </a>
                <a href="#" className="text-blue-500 hover:underline"> LinkedIn </a>
            </div> */}
        </div>
    </div>
    {/* {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />} */}
    </div>
    )
}
export default ProfileCard;