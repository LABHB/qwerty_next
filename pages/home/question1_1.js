import { Box, Button, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import Layout from "../components/Layout";

import { useContext } from "react";
import { AnswerContext } from "../providers/AnswerProvider"

import {SignInOrOutButton} from "../components/atoms/button/SignInOrOutButton"
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
  // const { setAnswer1 } = useContext(AnswerContext);
  const options = ['顧客獲得数を増やす（評価指標例：サービス申込などのコンバージョン数）', '顧客獲得単価を改善する、サービス利用継続率を上げる（評価指標例：CPI ,CPA ,LTVなど）', '興味関心度を上げる（評価指標例：サイト訪問数、サイト滞在時間、デモリクエスト数など）', '認知度を上げる（評価指標例：想起率向上、imp数など）', 'それ以外']

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

export default function Question1() {
  const { setAnswer1_1 } = useContext(AnswerContext);
  const router = useRouter()

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
    setAnswer1_1(answer);
    localStorage.setItem("question1_1", answer);
    console.log(answer)
    router.push("/home/question2")    
  }


  return (
    <form onSubmit={handleSubmit} >
    <Header>
    </Header>
    <div>
       <Head>
        <title>最初の質問</title>
       </Head>
      <h1>ザックリとした目的があるので、ターゲットを含めて、方針から考えたい。</h1>
      <h3>現在、設定されている目的について教えて下さい。</h3>
      
      <Example />
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        variant="outlined"
        onClick={handleSubmit}
      >
              次へ
      </Button>
      <div>
        <Link href="/">ホームへ戻る</Link>
      </div>
      <SignInOrOutButton />
    </div>
    </form>
  );
}