import React, { useRef } from "react";
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
} from "@chakra-ui/react";

import SelectCategory from "./SelectCategory";
import { useDisclosure } from "@chakra-ui/react";
import usePreviewImg from "../../hooks/usePreviewImg";
const ModalForm = ({ category, handleSelectCategory, imgRef }) => {

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
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="80vw" maxH="80vh"> {/* 모달 크기 조정 */}
            <ModalHeader fontSize="2xl">Modal Title</ModalHeader> {/* 폰트 크기 조정 */}
            <ModalCloseButton />
            <ModalBody fontSize="lg"> {/* 폰트 크기 조정 */}
              Tag
              <Divider my={4} />
              <Stack spacing={4}>
  
                <SelectCategory category={category} 
                handleSelectCategory={handleSelectCategory} />
              </Stack>
  
              <Divider my={4} />
              <Box>
                <h1>Post Avatar</h1>
              </Box>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  {/* <Image boxSize='200px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />*/}

                  {selectedFile && (
							// <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
              <>
								<Image boxSize='200px' src={selectedFile} alt='Dan Abramov' />
								{/* <CloseButton
									position={"absolute"}
									top={2}
									right={2}
									onClick={() => {
										setSelectedFile(null);
									}}
								/> */}
                </>
							// </Flex>
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