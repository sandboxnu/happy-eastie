import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContext } from '../context/context'
import { useState } from 'react'
import { AES } from 'crypto-js'
import { NextUIProvider } from '@nextui-org/react';
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  // default is a hashed empty object, which the API will respond to with a list of all resources
  const [encryptedQuizResponse, changeEncryptedQuizResponse] = useState("")
  return (
    <NextUIProvider>
      <div>
        <AppContext.Provider value={{ encryptedQuizResponse, changeEncryptedQuizResponse }}>
          <Component {...pageProps} />
        </AppContext.Provider>      
      </div>
    </NextUIProvider>
  )

}

export default MyApp
