import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";

// firestorageからデータを持ってくる
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { doc, setDoc, addDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from "react";
import { AnswerContext } from "../../providers/AnswerProvider";

export const FormDrawer = memo( function FormDrawer(props) {
  const {
    onClose,
    isOpen,
    userId,
    userEmail,
    answer1,
    answer1_1,
    answer2,
    answer2_1,
    answer2_2,
    answer3,
    answer4,
    answer5,
    answer5_1,
    answer6_1,
    answer6_2
  } = props;
  return (
    <Drawer placement="right" size="md" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="#506FB2">
            <Contact
            userEmail={userEmail}
            userId={userId}
            answer1={answer1} 
            answer1_1={answer1_1}
            answer2={answer2}
            answer2_1={answer2_1}
            answer2_2={answer2_2}
            answer3={answer3}
            answer4={answer4}
            answer5={answer5}
            answer5_1={answer5_1}
            answer6_1={answer6_1}
            answer6_2={answer6_2}/>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
  
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
  MdLocationCity
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import Router from "next/dist/server/router";
import { useRouter } from "next/router";

export function Contact({userId,userEmail,answer1,answer1_1, answer2, answer2_1, answer2_2, answer3, answer4,answer5,answer5_1, answer6_1, answer6_2}) {
  const registerUser = async event => {
    alert("test");

    event.preventDefault()
    const res = await fetch('../../api/send', {
      body: JSON.stringify({
        email: event.target.email.value,
        tel: event.target.tel.value,
        company: event.target.company.value,
        message: event.target.message.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
 
    const result = await res.json()
    const router = await Router();
    await router.push("/home/thankyou")
  }
  const router = useRouter();

  const SendFormData = async (e) =>  {
    e.preventDefault()
    const email = e.target.email.value
    const tel = e.target.tel.value
    const company = e.target.company.value
    const message = e.target.message.value
    const db = getFirestore()
    const timestamp = Date.now();
    const date = new Date(timestamp)
    setDoc(doc(db, "forms", date+{userId}.userId ), {
    userId: {userId}.userId,
    userEmail: {userEmail}.userEmail,
    answer1: {answer1}.answer1,
    answer1_1: {answer1_1}.answer1_1,
    answer2: {answer2}.answer2,
    answer2_1: {answer2_1}.answer2_1,
    answer2_2: {answer2_2}.answer2_2,
    answer3: {answer3}.answer3,
    answer4: {answer4}.answer4,
    answer5: {answer5}.answer5,
    answer5_1: {answer5_1}.answer5_1,
    answer6_1: {answer6_1}.answer6_1,
    answer6_2: {answer6_2}.answer6_2,
    email: {email}.email,
    tel: {tel}.tel,
    company: {company}.company,
    message: {message}.message
  });
  alert("test");
  await router.push("/home/thankyou")
  }
  


  return (
    <Container bg="#506FB2" maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box m={4} bg="white" borderRadius="lg">
          <Box m={8} color="#0B0E3F">
            <VStack spacing={5}>
            {/* <form onSubmit={registerUser} > */}
            <form onSubmit={SendFormData} >
              <FormControl id="name">
                <FormLabel>Your Name</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<BsPerson color="gray.800" />} 
                  />
                  <Input type="text" size="sm" placeholder='山田 太郎' />
                </InputGroup>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Mail</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<MdOutlineEmail color="gray.800" />}
                  />
                  <Input type="text" size="sm" value={userEmail}/>
                </InputGroup>
              </FormControl>
              <FormControl id="tel">
                <FormLabel>Tel</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<MdPhone color="gray.800" />}
                  />
                  <Input type="text" size="sm" placeholder='080-1234-5678'/>
                </InputGroup>
              </FormControl>
              <FormControl id="company">
                <FormLabel>Company</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<MdLocationCity color="gray.800" />}
                  />
                  <Input type="text" size="sm" placeholder='(株)QWERTY'/>
                </InputGroup>
              </FormControl>
              <FormControl id="message">
                <FormLabel>Message</FormLabel>
                <Textarea
                  size="sm"
                  borderColor="gray.300"
                  _hover={{
                    borderRadius: 'gray.300',
                  }}
                  placeholder="何かあれば記載ください"
                />
              </FormControl>
              <FormControl id="name" float="right">
                <Button
                  variant="solid"
                  bg="#0D74FF"
                  color="white"
                  _hover={{}}
                  type="submit"
                  // onClick={SendFormData}
                  >
                  Send Message
                </Button>
              </FormControl>
              </form>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}