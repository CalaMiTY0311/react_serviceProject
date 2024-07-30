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
import usePreviewImg from "../../hooks/usePreviewImg";
const ModalForm = ({ category, handleSelectCategory, fileLink, setFileLink, imgRef }) => {

  const [files, setFiles] = useState([]);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    console.log("files : ", selectedFiles);
  }
  // const handleTest= () => {
  //   console.log("files : ", files)
  // }

  const [select, setSelect] = useState(true);

  const handleSelect = () => {
    setSelect((prev) => !prev);
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)
  const imageRef = useRef(null)
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

  return (
    <>
      <h3>Tag</h3>
      <Button mt={4} onClick={onOpen}>
        Open Modal
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
            <br />


            <Stack direction="row" spacing={5}>
              <Radio
                isChecked={select}
                size='lg'
                onChange={handleSelect}
              >
                URL
              </Radio>
              <Radio
                isChecked={!select}
                size='lg'
                onChange={handleSelect}
              >
                Upload
              </Radio>
            </Stack>
            <br />
            {select ? (
              <>
              <Text mb='8px'>Download URL </Text>
              <Input
                placeholder='Here is a sample placeholder'
                size='sm'
                onChange={(e) => setFileLink({ ...fileLink, downloadURL: e.target.value })}
              />
              </>     
            ) : (
              <form>
              <input
                className='file-input'
                type="file"
                // mulitple
                onChange={handleFilesChange}
              />
              {/* <button onClick={handleTest}>upload</button> */}
            </form>
            )}
            <br /><br />
            <Box>
              Display Image
            </Box>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                {selectedFile && (
                  // <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                  <>
                    <Image boxSize='200px' src={selectedFile} alt='Dan Abramov' />
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