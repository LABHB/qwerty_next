import { Box, Button, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import {SignInOrOutButton} from "../components/atoms/button/SignInOrOutButton"

// firestorageからデータを持ってくる
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useContext, useEffect, useState } from "react";
import { AnswerContext } from "../providers/AnswerProvider";

export async function getBooks() {
  const books = new Array()
  const db = getFirestore()
  const booksSnapshot = await getDocs(collection(db, '/books'))

  booksSnapshot.forEach((doc) => {
    const book = doc.data()
    books.push({ ...book, id: doc.id })
  })

  return books
}

const DEFAULT_OUTPUT = {
  isLoading: true,
  books: [],
}

export function useBooks() {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)

  useEffect(() => {
    void (async () => {
      const books = await getBooks()
      setOutput({ isLoading: false, books })
    })()
  }, [])

  return output
}

export const BookTable = () => {
  const { isLoading, books } = useBooks()
  if (isLoading) return <p>Loading...</p>

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} / {book.author} / {book.price}
        </li>
      ))}
    </ul>
  )
}

// firestorageにデータを追記
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from "next/router";

//以下、firestorageへの追記コード////////////////////////////////////////////
// asyncにすると機能しなくなる（理由確認できず）ため、
// 取り急ぎ、asyncを削除して対応
// 伴って、awaitも削除して対応
//////////////////////////////////////////////////////////////////////////

// export async function AddBook(book) {
export function AddBook(book) {
// function AddBook(book) {
  const {id, title, author, price} = book
  const db = getFirestore()
  const docRef = doc(db, 'books', book.id)
  // await setDoc(docRef,
  setDoc(docRef,
    { title: title, author: author, price: price },
    { merge: true /* ドキュメントが存在する場合はフィールドを追記 */ }
  )
  return (
    <ul>
        <li key={book.id}>
          {book.title} / {book.author} / {book.price}
        </li>
    </ul>
  )
}



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
  const options = ['競合調査','自社サービスに関するアンケート', '既存顧客データ分析','広告運用','イベント実施','それ以外']

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

export default function Question2() {
  
  const {answer1, answer2, setAnswer1, setAnswer2 } = useContext(AnswerContext);
  const router = useRouter()
  //更新時にlocalstrageが定義されていないとエラー
  useEffect(() => {
    const saveAnswer1 = localStorage.getItem("question1");
    const saveAnswer2 = localStorage.getItem("answer2");
    setAnswer1(saveAnswer1); 
    setAnswer2(saveAnswer2);
  },[setAnswer1,setAnswer2]);

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
    setAnswer2(answer);
    localStorage.setItem("question2", answer);
    console.log(answer)
    router.push("/home/question3")    
  }


  return (
    <>
    <form onSubmit={handleSubmit} >
    <Header>
    </Header>
    <div>
       <Head>
        <title>2番目の質問</title>
       </Head>
      <h1>これまでに実施されていて、分かっている項目があれば、ご教示ください。</h1>
      <h3>※詳細は別途ヒアリングさせていただきますので、概要を記載ください。</h3>
      <Example />
      <BookTable />
      <Button      
        bg="orange.400"
        color="white"
        _hover={{ opacity: 0.8 }}
        onClick={handleSubmit}
      >
              次へ進む
      </Button>
      {answer1}
      {answer2}
      <div>
        <p>固定値であれば、データ追記可能</p>
        <AddBook id="id-5" title="book.title2" author="book.author2" price="book.price2" />
      </div>
      <div>
        <Link href="/">ホームへ戻る</Link>
      </div>
      <SignInOrOutButton />
    </div>
    </form>
    </>
  );
}