import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AppContext} from '../context/context'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [hash, changeHash] = useState("")

  return (
  <div>
    <AppContext.Provider value={{hash, changeHash}}>
      <Component {...pageProps} />
    </AppContext.Provider>
  </div>)
  
}


export default MyApp
