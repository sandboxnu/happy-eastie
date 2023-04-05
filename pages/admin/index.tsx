import { Button, Checkbox, FormElement, Input, Spacer } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import styles from "../../components/quiz/Quiz.module.css"
import { Admin } from "../../models/types2";
import { QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE } from "../../models/constants";
import { AES } from "crypto-js";

const LogIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepSignIn, setKeepSignIn] = useState(false)
  const [message, setMessage] = useState("")
  
  const onEmailChange = (e: ChangeEvent<FormElement>) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e: ChangeEvent<FormElement>) => {
    const hashedPassword = AES.encrypt(e.target.value, QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE).toString()
    setPassword(hashedPassword)
  }

  const submit = async () => {
    const requestBody = JSON.stringify({type: "login", email, password})
    const requestSettings =  { method: 'POST', body: requestBody, headers: {'Content-Type': 'application/json'}}
    const response = await fetch('/api/admin/authentication', requestSettings)
    if (response.status !== 200) {
        setMessage(response.statusText)
    } else {

    }
  }

  return (
    <>
        <Input clearable bordered labelPlaceholder="Name" onChange={onEmailChange} />
        <Spacer y={2.5} />
        <Input.Password
        labelPlaceholder="Password"
        onChange={onPasswordChange}/>
        <Spacer y={2.5} />
        <Checkbox onChange={checked => setKeepSignIn(checked)}>Keep me signed in</Checkbox>
        <Button id="continue" className={styles.continue} type="submit">
            Log In
        </Button>
    </>
  );
}

export default LogIn