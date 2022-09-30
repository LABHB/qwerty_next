import { Box, Button, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, Stack, Textarea, useDisclosure, useRadio, useRadioGroup } from "@chakra-ui/react";
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
import { CheckIcon } from "@chakra-ui/icons";

export default function Question4() {
  
  const {setAnswer6_1,setAnswer6_2 } = useContext(AnswerContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    const money = document.getElementsByClassName('chakra-numberinput__field')[0].value
    setAnswer6_1(money);
    const date = document.getElementsByClassName('chakra-input')[0].value
    setAnswer6_2(date);
    localStorage.setItem("question6_1", money);
    localStorage.setItem("question6_2", date);
    console.log(money)
    console.log(date)
    router.push("/home/answer")    
  }
  
  return (
    <>
    <Header>
    </Header>
    <div>
       <Head>
        <title>最後の質問</title>
       </Head>
      <div>
      <h1>Q 目安予算をご教示ください。</h1>
      <h3>※詳細は別途ヒアリングさせていただきますので、現時点での概要を記載ください。</h3>
      <HStack>
       <div>月額</div>      
      <NumberInput step={10} defaultValue={100} min={20} max={200} width="100px">
      <HStack>
        <NumberInputField/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </HStack>
      </NumberInput>
      <div>万円</div>      
      </HStack>
      </div>
      <div>
        <h1>Q 希望開始日をご教示ください。</h1>
          <h3>※詳細は別途ヒアリングさせていただきますので、現時点での概要を記載ください。</h3>
          <Input
          placeholder="Select Date and Time"
          htmlSize={4} width='auto'
          size="md"
          type="date"
          />
      </div>
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
        <Link href="/">ホームへ戻る</Link>
      </div>
      <SignInOrOutButton />
    </div>
    </>
  );
}