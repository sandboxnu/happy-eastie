import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContext } from '../context/context'
import { useState } from 'react'
import { createTheme, NextUIProvider, Text } from "@nextui-org/react"

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: '#219EA4',
      link: '#219EA4',
      brandBlue: '#22A6DD',
      brandPurple: '#630DF0',
      brandOrange: '#F0880D',
      brandGreen: '#55C130',
      secondaryText: '#7E7C7C'
    },
    space: {},
    fonts: {}
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  // default is a hashed empty object, which the API will respond to with a list of all resources
  const [encryptedQuizResponse, changeEncryptedQuizResponse] = useState("")
  return (
    <NextUIProvider theme={theme}>
      <div>
        <AppContext.Provider value={{ encryptedQuizResponse, changeEncryptedQuizResponse }}>
          <Component {...pageProps} />
        </AppContext.Provider>      
      </div>
    </NextUIProvider>
  )

}

export default MyApp
