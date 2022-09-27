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
  const options = ['ザックリとした目的があるので、ターゲットを含めて、方針から考えたい。', '具体的なターゲットは決まっているので、アプローチ方法から検討したい。', 'ターゲット、メディア、クリエーティブの見当はついていて、具体的な運用方法・知見を知りたい。', '実際に広告運用をしているが、運用効率をもっと上げたい。', 'サービス利用者獲得数は維持できているが、継続率が低くなっていて、改善したい。']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  const group = getRootProps()

//最悪、以下のコードでチェックしたValueを引き出す。（元来設定されている"data-checked"の要素を付加する、機能が落ちてしまい、選択した項目のスタイルが変化しなくなる）
  // const selectedAnswer = (e) => {
  //   appendChild("data-checked");
  //   const rawAnswer1 = e.currentTarget.value;
  //   setAnswer1(rawAnswer1);
  //   localStorage.setItem("answer1", JSON.stringify(rawAnswer1));
  //   console.log(e)
  // }

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          // <RadioCard key={value} {...radio} onClick={selectedAnswer}>
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}

export default function Question1() {
  const { answer1, answer2, setAnswer1, setAnswer2 } = useContext(AnswerContext);
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
    setAnswer1(answer);
    localStorage.setItem("question1", answer);
    // setAnswer1(answer);
    // const name = {name:"Tadashi", pwd:"password"}
    // const password = "password"
    // localStorage.setItem("name", JSON.stringify(name));
    // localStorage.setItem("pwd", JSON.stringify(password));
    // const rawAnswer1 = document.querySelector('data-checked');
    // const rawAnswer2 = "password"
    // setAnswer1(rawAnswer1);
    // setAnswer2(rawAnswer2);
    // localStorage.setItem("answer1", JSON.stringify(rawAnswer1));
    // localStorage.setItem("answer2", JSON.stringify(rawAnswer2));
    // console.log(allAnswer00)
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
      <h1>Q 現状に近しい項目を選択して下さい。</h1>
      
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