import React from "react";
import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import "./modelPostForm.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { 
  Input, Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  useDisclosure,
Box, Button, Divider, Stack, Image, Center} from "@chakra-ui/react";

import pics from "./default.jpg";

function ModelPostForm() {
  return (
    <>
    <div className="user-info_container">
      <br /><br />
      <BodyForm />
      {/* <RepresentIMG /> */}
    </div>
    {/* <RepresentIMG /> */}
    </>
  );
}

const RepresentIMG = () => {
  return (
    <div className="order-summary_container">
      <img src={pics} alt="Order Summary Image" className="order-summary-image" />
    </div>
  )
}

function BodyForm() {
  return (
    <>
    {/* <div className="order-summary_container">
  <img src={pics} alt="Order Summary Image" class="order-summary-image" />
</div> */}
    <div className="contact-info_container">
      <h3>Title</h3>
      <Input placeholder='large size' size='lg' height="25px" />
    </div>
    <TagForm />
    <div className="shipping-address_container">
      <h3>Shipping Address</h3>
      <div className="shipping-address_wrapper">
      <Textarea
          placeholder="Enter text here"
          size="lg"
          // width="400px"
          height="304px" // Increased height for larger textarea
          fontSize="1.5rem"
          resize="none" // Disable resize
        />
        <button className="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
    </>
  );
}

const TagForm = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

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
      <Box>
        <h1>Gender</h1>
      </Box>
      <Stack direction="row" spacing={4}>
        <Button colorScheme='teal' size='lg'>
          Male
        </Button>
        <Button colorScheme='teal' size='lg'>
          Female
        </Button>
        <Button colorScheme='teal' size='lg'>
          Other
        </Button>
      </Stack>
      <Box>
        <h1>Other Tag</h1>
      </Box>
      <Stack direction="row" spacing={4}>
        <Button colorScheme='teal' size='md'>
          Vtuber
        </Button>
        <Button colorScheme='teal' size='md'>
          actor
        </Button>
        <Button colorScheme='teal' size='md'>
          Singer
        </Button>
        <Button colorScheme='teal' size='md'>
          Anime
        </Button>
      </Stack>
    </Stack>
          <Divider my={4} />
          <Box>
            <h1>Post Avatar</h1>
          </Box>
          <Stack direction={["column", "row"]} spacing={6}>
                                <Center>
                                <Image boxSize='200px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                                </Center>
                                <Center>
                                    <Button
                                        onClick={() => fileRef.current.click()}
                                    >
                                        Edit Profile Picture
                                    </Button>
                                </Center>
                                </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  );
};

export default ModelPostForm;
