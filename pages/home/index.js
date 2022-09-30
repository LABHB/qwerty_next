import { Box, Button, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import { useEffect } from "react";

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
       <CallToActionWithIllustration/>
       <SplitWithImage/>
       <SimpleTwoColumns/>
       <Head>
        <title>MyPageのTOP</title>
       </Head>
      <Flex
          direction="column"
          align="center"
          mb={10}>
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        as="a"
        href="/home/question1" 
        height="60px"
        >
              簡単な質問に答えて<br/>
              オリエンを作成する
              <Icon as={IoArrowForwardCircleOutline} color={'white.500'} w={5} h={5} mx={1}/>
      </Button>
      <Button onClick={handleLogout}>ログイン画面へ戻る</Button>
      </Flex>
    </>
  );
}

import {
  Container,
  Heading,
  Stack,
  Text,
  Icon,
  IconProps,
} from '@chakra-ui/react';

export function CallToActionWithIllustration() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        pb={{ base: 10, md: 20 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Finding your Ad agency{' '}
          <Text as={'span'} color={'orange.400'}>
            makes easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Never miss a meeting. Never be late for one too. Keep track of your
          meetings and receive smart reminders in appropriate times. Read your
          smart “Daily Agenda” every morning.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}>
            Get started
          </Button>
          <Button rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack>
        {/* <Flex w={'full'}>
          <Image
          alt="feature_main"
            src="/feature_main.svg"
            width='500px'
            height='300px'
            // height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex> */}
      </Stack>
    </Container>
  );
}

import {
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';

import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
  IoAccessibility,
  IoChatboxEllipses,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';

import { ReactElement } from 'react';

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export function SplitWithImage() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading>あなたにとって <Text fontSize={80}>最高</Text> の広告代理店を探します</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
          数多ある代理店の中から誰に頼めば良いか分からない。<br/>
          そんな広告宣伝担当者の課題を解決します。
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Icon as={IoAccessibility} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'過去実績が担保された代理店DBから検討'}
            />
            <Feature
              icon={<Icon as={IoChatboxEllipses} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'オリエン内容に合わせた最適な代理店の選定'}
            />
          </Stack>
        </Stack>
        <Flex justify="center">
          <Image
            rounded={'md'}
            alt={'feature image'}
            width="800px"
            height="150px"
            src={
              '/feature_main.svg'
            }
            objectFit={'contain'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}

import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

 export const ColumnFeature = ({ title, text, icon,iconBg }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={iconBg}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export function SimpleTwoColumns() {
  return (
    <Box p={4}>
      <Flex justify='center'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} maxWidth="992px">
        <ColumnFeature
          icon={<Icon as={IoAccessibility} color={'yellow.500'} w={10} h={10} />}
          iconBg={useColorModeValue('yellow.100', 'yellow.900')}
          title={'Lifetime Support'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <ColumnFeature
          icon={<Icon as={IoChatboxEllipses} color={'green.500'} w={10} h={10} />}
          iconBg={useColorModeValue('green.100', 'green.900')}
          title={'Unlimited Donations'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
      </SimpleGrid>
      </Flex>
    </Box>
  );
}