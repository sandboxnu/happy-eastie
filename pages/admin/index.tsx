import { Button, FormElement, Input, Spacer } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import styles from "../../components/quiz/Quiz.module.css"
import { Admin } from "../../models/types2";

const LogIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const onEmailChange = (e: ChangeEvent<FormElement>) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e: ChangeEvent<FormElement>) => {
    const hashedPassword = AES.encrypt(e.target.value, QUIZ)
    setPassword(e.target.value)
  }

  const submit = () => {
    const requestBody = JSON.stringify({type: "login", email, password})
    const requestSettings =  { method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}}
    const resourcesFetcher = async () : Promise<Admin> => {
    const response : Response = await fetch('/api/resources', requestSettings)
    const resources : ResourcesResponse = await response.json()
    return resources.data
  } 
  }

  return (
    <>
      <Input clearable bordered labelPlaceholder="Name" onChange={onEmailChange} />
      <Spacer y={2.5} />
      <Input.Password
        labelPlaceholder="Password"
        onChange={onPasswordChange}/>
        <Button id="continue" className={styles.continue} type="submit">
              Log In
        </Button>
    </>
  );
}

export default LogIn