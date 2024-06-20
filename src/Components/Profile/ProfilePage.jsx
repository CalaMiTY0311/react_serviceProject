import { Avatar, Typography, Button } from "@material-tailwind/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";

import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const ProfilePage = () => {
	const { username } = useParams();
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
	const authUser = useAuthStore((state) => state.user);

	const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound />;

	return (
		<>
		{/* <Navbar /> */}
      <section className="relative block h-[50vh]">
        <div className="absolute top-0 h-full w-full bg-gray-700 bg-opacity-60" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src={authUser.profilePicURL}
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                    {authUser.username}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">jena@mail.com</Typography>
                </div>
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <Button className="bg-gray-900 w-fit lg:ml-auto">Connect</Button>
                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      22
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Friends
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Photos
                    </Typography>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      89
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Comments
                    </Typography>
                  </div>
                </div>

              </div>
            </div>
            {/* <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <Typography className="font-medium text-blue-gray-500">
                  Los Angeles, California
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="font-medium text-blue-gray-500">
                  Solution Manager - Creative Tim Officer
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography className="font-medium text-blue-gray-500">
                  University of Computer Science
                </Typography>
              </div>
            </div> */}
            <div className="mb-10 py-6">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                </Typography>
                <Button variant="text">Show more</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="bg-white">
        <Footer />
      </div> */}
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