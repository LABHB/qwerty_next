import { Button, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import { AnswerContext } from "../providers/AnswerProvider";

export default function MyPageTop() {
    
  const {answer1, answer2, answer3, answer4, setAnswer1, setAnswer2, setAnswer3, setAnswer4 } = useContext(AnswerContext);
  const router = useRouter()
  //更新時にlocalstrageが定義されていないとエラー
  useEffect(() => {
    const saveAnswer1 = localStorage.getItem("question1");
    const saveAnswer2 = localStorage.getItem("question2");
    const saveAnswer3 = localStorage.getItem("question3");
    const saveAnswer4 = localStorage.getItem("question4");
    setAnswer1(saveAnswer1); 
    setAnswer2(saveAnswer2);
    setAnswer3(saveAnswer3); 
    setAnswer4(saveAnswer4);
  },[setAnswer1,setAnswer2,setAnswer3,setAnswer4]);


  return (
    <>
      <Header>
      </Header>
       <Head>
        <title>MyPageのTOP</title>
       </Head>
      <Flex
          direction="column"
          align="center"
          mb={10}>
        <h1>オリエン内容</h1>
        <img src="/sample.png" width="40%" />
        <p>q1</p>{answer1}
        <p>q2</p>{answer2}
        <p>q3</p>{answer3}
        <p>q4</p>{answer4}
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        as="a"
        href="/home" 
        >
              オリエンを提出
      </Button>
      <div>
        <Link href="/">ログイン画面へ戻る</Link>
      </div>
        </Flex>
    </>
  );
}