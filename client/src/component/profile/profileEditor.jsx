import React, { useRef, useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";

import useAuthStore from '../../store/authStore';
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import useShowToast from "../../hooks/useShowToast";

import { useNavigate } from 'react-router-dom';


const ProfileEditor = ({ isOpen, onClose }) => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        bio: "",
        twitterURL:"",
        instagramURL:"",
        facebookURL:"",
        githubURL:"",
    });

    const fileRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isUpdating, editProfile } = useEditProfile();
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast();


    const handleEditProfile = async () => {
                try {
                    console.log(inputs)
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            onClose();
            if(inputs.username===""){
                navigate(`/profile/${authUser.username}`);
            } else {
                navigate(`/profile/${inputs.username}`);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent maxW="600px" height="700px">
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <Stack direction={["column", "row"]} spacing={6}>
                                <Center>
                                    <Avatar
                                        size='xl'
                                        src={
                                            selectedFile ||
                                            authUser.profilePicURL}
                                        border={"2px solid white "}
                                    />
                                </Center>
                                <Center w='full'>
                                    <Button w='full'
                                        onClick={() => fileRef.current.click()}
                                    >
                                        Edit Profile Picture
                                    </Button>
                                </Center>
                                <Input type='file'
                                    hidden ref={fileRef} onChange={handleImageChange}
                                />
                            </Stack>
                        </FormControl>

                        <FormControl>
                            <FormLabel>username</FormLabel>
                            <Input placeholder={inputs.username || authUser.username}
                                value={inputs.username || authUser.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />

                        </FormControl>

                        <FormControl>
                            <FormLabel>edit Bio</FormLabel>
                            <Input placeholder={inputs.bio || authUser.bio}
                                value={inputs.bio || authUser.bio}
                                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })} />
                        </FormControl>

                        <FormControl>
    <FormLabel>Twitter</FormLabel>
    <Input 
        placeholder={inputs.twitterURL || authUser.twitterURL || 'Twitter URL'}
        value={inputs.twitterURL || authUser.twitterURL}
        onChange={(e) => setInputs({ ...inputs, twitterURL: e.target.value })}
    />
</FormControl>

<FormControl>
    <FormLabel>Instagram</FormLabel>
    <Input 
        placeholder={inputs.instagramURL || authUser.instagramURL || 'Instagram URL'}
        value={inputs.instagramURL || authUser.instagramURL}
        onChange={(e) => setInputs({ ...inputs, instagramURL: e.target.value })}
    />
</FormControl>

<FormControl>
    <FormLabel>Github</FormLabel>
    <Input 
        placeholder={inputs.githubURL || authUser.githubURL || 'Github URL'}
        value={inputs.githubURL || authUser.githubURL}
        onChange={(e) => setInputs({ ...inputs, githubURL: e.target.value })}
    />
</FormControl>

<FormControl>
    <FormLabel>FaceBook</FormLabel>
    <Input 
        placeholder={inputs.facebookURL || authUser.facebookURL || 'Facebook URL'}
        value={inputs.facebookURL || authUser.facebookURL}
        onChange={(e) => setInputs({ ...inputs, facebookURL: e.target.value })}
    />
</FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleEditProfile} isLoading={isUpdating}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileEditor;
