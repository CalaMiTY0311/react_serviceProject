import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ onClose }) => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        bio: "",
    });
    const authUser = useAuthStore((state) => state.user);
    const fileRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isUpdating, editProfile } = useEditProfile();
    const showToast = useShowToast();

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            onClose();
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            bg="white"
            p={6}
            rounded="md"
            boxShadow="lg"
            border="1px solid gray"
            maxW="md"
            mx="auto"
        >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} color="black">
                Edit Profile
            </Heading>
            <FormControl>
                <Stack direction={["column", "row"]} spacing={6} my={4}>
                    <Center>
                        <Avatar
                            size='xl'
                            src={selectedFile || authUser.profilePicURL}
                            border={"2px solid black"}
                        />
                    </Center>
                    <Center w='full'>
                        <Button w='full' onClick={() => fileRef.current.click()}>
                            Edit Profile Picture
                        </Button>
                    </Center>
                    <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                </Stack>
            </FormControl>

            <FormControl my={4}>
                <FormLabel fontSize={"sm"} color="black">Full Name</FormLabel>
                <Input
                    placeholder={"Full Name"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.fullName || authUser.fullName}
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                />
            </FormControl>

            <FormControl my={4}>
                <FormLabel fontSize={"sm"} color="black">Username</FormLabel>
                <Input
                    placeholder={"Username"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.username || authUser.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
            </FormControl>

            <FormControl my={4}>
                <FormLabel fontSize={"sm"} color="black">Bio</FormLabel>
                <Input
                    placeholder={"Bio"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.bio || authUser.bio}
                    onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                />
            </FormControl>

            <Stack spacing={6} direction={["column", "row"]} my={4}>
                <Button
                    bg={"red.400"}
                    color={"white"}
                    w='full'
                    size='sm'
                    _hover={{ bg: "red.500" }}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    bg={"blue.400"}
                    color={"white"}
                    size='sm'
                    w='full'
                    _hover={{ bg: "blue.500" }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                >
                    Submit
                </Button>
            </Stack>
        </Flex>
    );
};

export default EditProfile;