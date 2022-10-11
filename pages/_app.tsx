import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContext } from '../context/context'
import { useState } from 'react'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  // default is a hashed empty object, which the API will respond to with a list of all resources
  const [encryptedQuizResponse, changeEncryptedQuizResponse] = useState("")

  return (
    <div>
      <AppContext.Provider value={{ encryptedQuizResponse, changeEncryptedQuizResponse }}>
        <Component {...pageProps} />
      </AppContext.Provider>      
    </div>
  )

}

export default MyApp
