import { Button, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import Layout from "../components/Layout";

import { app } from "../firebase"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "next/router"

export default function MyPageTop() {
    const router = useRouter()
    const auth = getAuth(app)
    const handleLogout = async () => {
      await signOut(auth)
      await router.push("/signup")
    }
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
        <h1>MyPageのTOP</h1>
        <img src="/service.png" width="80%" />
        <img src="/userflow.png"  width="80%"/>
        <h1>最適な代理店を探す最初の一歩として、<br/>
            いくつかの質問に答えて 「簡単オリエン」 を作成しましょう。</h1>
        <img src="/orien.png"  width="30%"/>
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        as="a"
        href="/home/question1" 
        >
              オリエンを作成する
      </Button>
      <div>
        <Button onClick={handleLogout}>ログイン画面へ戻る</Button>
      </div>
        </Flex>
    </>
  );
}