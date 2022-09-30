import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, Stack, Textarea, useDisclosure, useRadio, useRadioGroup } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import {SignInOrOutButton} from "../components/atoms/button/SignInOrOutButton"

// firestorageからデータを持ってくる
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from "react";

//グローバルステートを利用
import { AnswerContext } from "../providers/AnswerProvider";
import { useRouter } from "next/router";


// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

function RadioCardModal(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const {answer5,setAnswer5,answer5_1,setAnswer5_1 } = useContext(AnswerContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    const allAnswers = document.getElementsByName('framework')
    const freeAnswer = document.getElementsByClassName('chakra-textarea')
    var allAnswerArray = Object.keys(allAnswers).map(function (key) {
      return allAnswers[key];
  });
  var selectedAnswer = [];
  allAnswerArray.map((answer)=>{
      if(answer.checked){
        selectedAnswer.push(answer.value);
      }
    })
    const answer = selectedAnswer.toString();
    setAnswer5(answer);
    localStorage.setItem("question5", answer);
    console.log(answer)
    console.log(freeAnswer[0].value)

    setAnswer5_1(freeAnswer[0].value);
    localStorage.setItem("question5_1", freeAnswer[0].value);
 
    router.push("/home/question6")    
  }

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
        onClick={onOpen}
      >
        {props.children}
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>その他</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>代理店に求める条件を記載ください</FormLabel>
              <Textarea size='lg' ref={initialRef} placeholder='First name' />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              次に進む
            </Button>
            <Button onClick={onClose}>選択しなおす</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function Example() {
  const options = ['レスポンスが速い','実績が豊富', 'オフラインでも相談できる（勤務先が近い）','内製化に向けた体制構築もお願いできる','その他']
  const option = ['Modal']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })
  
  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
      {option.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCardModal key={value} {...radio}>
            {value}
          </RadioCardModal>
        )
      })}
    </HStack>
  )
}

export default function Question5() {
  
  const {answer5,setAnswer5 } = useContext(AnswerContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    const allAnswers = document.getElementsByName('framework')
    var allAnswerArray = Object.keys(allAnswers).map(function (key) {
      return allAnswers[key];
  });
  var selectedAnswer = [];
  allAnswerArray.map((answer)=>{
      if(answer.checked){
        selectedAnswer.push(answer.value);
      }
    })
    const answer = selectedAnswer.toString();
    setAnswer5(answer);
    localStorage.setItem("question5", answer);
    console.log(answer)
    router.push("/home/question6")    
  }
  
  return (
    <>
    <Header>
    </Header>
    <div>
       <Head>
        <title>5番目の質問</title>
       </Head>
      <h1>Q お願いする代理店に求める条件を選択して下さい。</h1>
      <h3>※詳細は別途ヒアリングさせていただきますので、概要を記載ください。</h3>
      <Example />
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        variant="outlined"
        onClick={handleSubmit}
      >
              回答を終える
      </Button>
      <div>
        <Link href="/">最後の質問に進む</Link>
      </div>
      <SignInOrOutButton />
    </div>
    </>
  );
}