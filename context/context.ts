import {createContext} from 'react'

export const AppContext = createContext({
    encryptedQuizResponse: "",
    changeEncryptedQuizResponse: (newHash: string) => {}
})
