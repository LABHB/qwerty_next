import { Box, Button, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import {SignInOrOutButton} from "../components/atoms/button/SignInOrOutButton"

// firestorageからデータを持ってくる
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useContext, useEffect, useState } from "react";

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

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function Example() {
  const options = ['0次分析（アンケート調査の実施（設問設計～示唆出し）など）','施策・企画のブレインストーミング（案出し）', 'ブランドやMVVの見直しや再定義','データ利活用（Googleなどの外部データ連携、既存のお客様データの分析、等)','その他','特になし']

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
    </HStack>
  )
}

export default function Question3() {
  
  const {answer1, answer2, answer3, setAnswer1, setAnswer3 } = useContext(AnswerContext);

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
    setAnswer3(answer);
    localStorage.setItem("question3", answer);
    console.log(answer)
    router.push("/home/question4")    
  }
  
  //更新時にlocalstrageが定義されていないとエラーが生じるので、useEffectを活用
  //{answer2}はここで入れていないので、更新すると表示されない（nullになる？それともレンダリング時に値が見つからないのでnullなだけ？）
  //どうやら{answer2}はnullになってしまうため、注意
  useEffect(() => {
    const saveAnswer1 = localStorage.getItem("question1");
    setAnswer1(saveAnswer1); 
  },[setAnswer1]);

  return (
    <>
    <Header>
    </Header>
    <div>
       <Head>
        <title>3番目の質問</title>
       </Head>
      <h1>プラニングにあたって実施したい項目があれば、教えてください。</h1>
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
      {answer1}
      {answer2}
      <div>
        <Link href="/">ホームへ戻る</Link>
      </div>
      <SignInOrOutButton />
    </div>
    </>
  );
}