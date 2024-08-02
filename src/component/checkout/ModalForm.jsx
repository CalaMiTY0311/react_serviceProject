import React, { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  Stack,
  Box,
  Image,
  Input,
  Center,
  Text,
  Radio,
} from "@chakra-ui/react";

import SelectCategory from "./SelectCategory";
import { useDisclosure } from "@chakra-ui/react";

const ModalForm = ({category, handleSelectCategory,
                    handleImageChange, selectedFile, setSelectedFile, imageRef}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Select Category
      </Button>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent maxW="80vw" maxH="80vh">
          <ModalHeader fontSize="2xl">Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="lg">
            Tag
            <Divider my={4} />
            <Stack spacing={4}>

              <SelectCategory category={category}
                handleSelectCategory={handleSelectCategory} />
            </Stack>

            <Divider my={4} />

            <br /><br />
            <Box>
              Display Image
            </Box>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                {selectedFile && (
                  // <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                  <>
                    <Image boxSize='200px' src={selectedFile} />
                    { }
                  </>
                )}

              </Center>
              <Center>
                <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />
                <Button
                  onClick={() => imageRef.current.click()}
                >
                  Edit Profile Picture
                </Button>
                {selectedFile && (
                  <Button
                    onClick={() => {
                      setSelectedFile(null);
                    }}>X</Button>

                )}
              </Center>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={onClose}>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForm;