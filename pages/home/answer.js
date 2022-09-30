import { Button, Flex, Heading, LinkBox, LinkOverlay, MenuItem, useDisclosure, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import { AnswerContext } from "../providers/AnswerProvider";
import { FormDrawer } from "../components/molecules/FormDrawer";

import '../firebase' // Initialize FirebaseApp
import { useAuthState } from '../hooks/useAuthState'


export default function AnswerTop() {
  const { userId,userEmail} = useAuthState()

  const {answer1,answer1_1, answer2, answer2_1, answer2_2, answer3, answer4, answer4_1 ,answer5,answer5_1, answer6, answer6_1 ,answer6_2,schedule ,userinfo, setAnswer1, setAnswer1_1, setAnswer2, setAnswer2_1, setAnswer2_2, setAnswer3, setAnswer4 ,setAnswer4_1, setAnswer5, setAnswer5_1, setAnswer6, setAnswer6_1, setAnswer6_2, setUserInfo  } = useContext(AnswerContext);
  const router = useRouter()

  //更新時にlocalstrageが定義されていないとエラー
  useEffect(() => {
    const saveAnswer1 = localStorage.getItem("question1");
    const saveAnswer1_1 = localStorage.getItem("question1_1");
    const saveAnswer2 = localStorage.getItem("question2");
    const saveAnswer2_1 = localStorage.getItem("question2_1");
    const saveAnswer2_2 = localStorage.getItem("question2_2");
    const saveAnswer3 = localStorage.getItem("question3");
    const saveAnswer4 = localStorage.getItem("question4");
    const saveAnswer4_1 = localStorage.getItem("question4_1");
    const saveAnswer5 = localStorage.getItem("question5");
    const saveAnswer5_1 = localStorage.getItem("question5_1");
    const saveAnswer6_1 = localStorage.getItem("question6_1");
    const saveAnswer6_2 = localStorage.getItem("question6_2");

    setAnswer1(saveAnswer1); 
    setAnswer1_1(saveAnswer1_1); 
    setAnswer2(saveAnswer2);
    setAnswer2_1(saveAnswer2_1);
    setAnswer2_2(saveAnswer2_2);
    setAnswer3(saveAnswer3); 
    setAnswer4(saveAnswer4);
    setAnswer4_1(saveAnswer4_1);
    setAnswer5(saveAnswer5); 
    setAnswer5_1(saveAnswer5_1);
    // setAnswer6(saveAnswer6);
    setAnswer6_1(saveAnswer6_1);
    setAnswer6_2(saveAnswer6_2);

  },[setAnswer1,setAnswer1_1,setAnswer2,setAnswer2_1,setAnswer2_2,setAnswer3,setAnswer4,setAnswer4_1,setAnswer5,setAnswer5_1,setAnswer6,setAnswer6_1,setAnswer6_2]);


  
  const Schedule = () => {
    window.open('https://timerex.net/s/22qwerties_5ffc/a70e632b')
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header>
      </Header>
       <Head>
        <title>Answer</title>
       </Head>
      <Flex
          direction="column"
          align="center"
          mb={10}>
        <Heading mt={5}>オリエン内容の整理</Heading>
        </Flex>
        <VStack spacing={10}>
        <TestimonialCard1
        answer1={answer1}
        answer1_1={answer1_1}
        />
        <TestimonialCard2
        answer2={answer2}
        answer2_1={answer2_1}
        answer2_2={answer2_2}
        />
        <TestimonialCard3
        answer3={answer3}
        />
        <TestimonialCard4
        answer4={answer4}
        />
        <TestimonialCard5
        answer5={answer5}
        answer5_1={answer5_1}
        />
        <TestimonialCard6
        answer6_1={answer6_1}
        answer6_2={answer6_2}
        />
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        onClick={Schedule}
        >
              上記内容にて一度相談してみる
      </Button>
      <Button>
      {userId}
      {userEmail}
      </Button>
        <div>
          <Link href="/">ホーム画面へ戻る</Link>
        </div>
        <Button onClick={onOpen}>開くボタン</Button>
      <FormDrawer
        onClose={onClose}
        isOpen={isOpen}
        userId={userId}
        userEmail={userEmail}
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
        answer6_2={answer6_2}
      />
        </VStack>
    </>
  );
}

import {
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { Schedule } from "@mui/icons-material";
import { MenuIconButton } from "../components/atoms/button/MenuIconButton";
import { MenuDrawer } from "../components/molecules/MenuDrawer";

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];


function TestimonialCard1(props) {
  const { name, role, content, avatar, index,answer1,answer1_1 } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '"Q 現状に近い項目を選択してください"',
        position: 'absolute',
        height: '21px',
        width: 'auto',
        fontWeight: 'bold',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          現状：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer1}
          </chakra.span>
        </chakra.p>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          目的：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer1_1}
          </chakra.span>
        </chakra.p>
      </Flex>
    </Flex>
  );
}

function TestimonialCard2(props) {
  const { index,answer2_1,answer2_2 } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '"Q これまで実施した宣伝施策を教えてください"',
        position: 'absolute',
        height: '21px',
        width: 'auto',
        fontWeight: 'bold',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          実施施策：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer2_1}
          </chakra.span>
        </chakra.p>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          実施結果：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer2_2}
          </chakra.span>
        </chakra.p>
      </Flex>
    </Flex>
  );
}

function TestimonialCard3(props) {
  const { index,answer3 } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '"Q プラニングにあたって実施したい項目があれば、教えてください。"',
        position: 'absolute',
        height: '21px',
        width: 'auto',
        fontWeight: 'bold',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          検討施策：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer3}
          </chakra.span>
        </chakra.p>
      </Flex>
    </Flex>
  );
}

function TestimonialCard4(props) {
  const { index,answer4 } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '"Q 現状、参考にしたいと考えている事例があれば、教えてください。"',
        position: 'absolute',
        height: '21px',
        width: 'auto',
        fontWeight: 'bold',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          参考事例：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer4}
          </chakra.span>
        </chakra.p>
      </Flex>
    </Flex>
  );
}

function TestimonialCard5(props) {
  const { index,answer5,answer5_1 } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '"Q 代理店に求める条件を選択して下さい。"',
        position: 'absolute',
        height: '21px',
        width: 'auto',
        fontWeight: 'bold',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        {answer5!="" ?
          <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
            {answer5}：
            <chakra.span
              fontFamily={'Inter'}
              fontWeight={'medium'}
              color={'gray.500'}>
              {' '}
              {answer5_1}
            </chakra.span>
          </chakra.p>
          :
          <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          条件：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer5}
          </chakra.span>
        </chakra.p>
        }
      </Flex>
    </Flex>
  );
}

function TestimonialCard6(props) {
  const { index,answer6_1,answer6_2 } = props;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '"Q その他、現状について教えてください"',
        position: 'absolute',
        height: '21px',
        width: 'auto',
        fontWeight: 'bold',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        backgroundImage: backgrounds[index % 4],
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          予算：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer6_1}万円/月
          </chakra.span>
        </chakra.p>
        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          施策開始時期：
          <chakra.span
            fontFamily={'Inter'}
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            {answer6_2}〜
          </chakra.span>
        </chakra.p>
      </Flex>
    </Flex>
  );
}
