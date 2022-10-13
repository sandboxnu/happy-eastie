import {createContext} from 'react'

// state to be accesible throughout application
// stores encrypted version of user's quiz responses, and a function that enables updating this value
// other pages can use the cached quiz responses to request the appropriate resources 
export const AppContext = createContext({
    encryptedQuizResponse: "",
    changeEncryptedQuizResponse: (newHash: string) => {}
})
