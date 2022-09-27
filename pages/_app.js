import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { LoginUserProvider }from "./providers/LoginUserProvider"
import { AnswerProvider } from "./providers/AnswerProvider"

import { css } from "@emotion/react"
// import Header from "../src/components/header"
import { AuthProvider } from "./AuthContext"

import './firebase' // Initialize FirebaseApp

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.800"
      }
    }
  }
});

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AnswerProvider>
        <LoginUserProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </LoginUserProvider>
      </AnswerProvider>
    </AuthProvider>
  )  
}

export default MyApp