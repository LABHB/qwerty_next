import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, Stack, Text, Textarea, useDisclosure, useRadio, useRadioGroup } from "@chakra-ui/react";
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
  
  const {answer4,setAnswer4 } = useContext(AnswerContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    const answer = document.getElementsByClassName('chakra-input')[0].value
    setAnswer4(answer);
    localStorage.setItem("question4", answer);
    console.log(answer)
    router.push("/home/question5")    
  }
  
  return (
    <>
    <Header>
    </Header>
    <div>
       <Head>
        <title>4つめの質問</title>
       </Head>

      <div>
        <Heading as='h3' size='md'>Q 現状、参考にしたいと考えている事例があれば、教えてください。</Heading>
        <Text color="gray.400" as="i">
          例. 化粧品A社の新商品Bのキャンペーン。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SNSにて広告を実施しており、無料サンプル配布も同時に行うことで、<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;興味関心を持ってくれた見込み顧客のデータ獲得にも成功していた。</Text>
      </div>
          <Input
          placeholder="参考URLなどもあれば、合わせてこちらに記述ください"
          htmlSize={4}
          width='50%'
          height="300px"
          size="sm"
          />
          <div>
            {/* <Input type="file"></Input> */}
          </div>
          <div>
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        variant="outlined"
        onClick={handleSubmit}
      >
              次へ進む
      </Button>
          </div>
      <div>
        <Link href="/">ホームへ戻る</Link>
      </div>
      <SignInOrOutButton />
    </div>
    </>
  );
}