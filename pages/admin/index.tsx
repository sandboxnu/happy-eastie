import {
  Button,
  Checkbox,
  FormElement,
  Input,
  Spacer,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import styles from "../../components/quiz/Quiz.module.css";
import { Admin } from "../../models/types2";
import CryptoJS from "crypto-js";

import { useRouter } from "next/router";
import { IRON_OPTION, QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE } from "../../models/constants";
import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({req}) {
    console.log("context ", req.session)

    const user = req.session.user;

    if (user &&  user.isAdmin) {
      return {
        redirect: {
          destination: '/admin/dashboard',
          permanent: false,
        }
      };
    }
    else {
      return {
        props: {}
      }
    }
  }, IRON_OPTION)

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();


  const onEmailChange = (e: ChangeEvent<FormElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<FormElement>) => {
    setPassword(e.target.value);
  };

  const submit = async () => {
    setMessage("");
    const hashedPassword = CryptoJS.SHA256(password).toString()
    const requestBody = JSON.stringify({
      type: "login",
      email,
      hashedPassword,
      keepSignedIn
    });
    const requestSettings = {
      method: "POST",
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/api/admin/authentication", requestSettings);
    if (response.status !== 200) {
      setMessage("authentication failed" + response.status);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <>
      {" "}
      <p>{message}</p>
      <Input
        clearable
        bordered
        labelPlaceholder="Name"
        onChange={onEmailChange}
      />
      <Spacer y={2.5} />
      <Input.Password
        labelPlaceholder="Password"
        bordered
        onChange={onPasswordChange}
      />
      <Spacer y={2.5} />
      <Checkbox onChange={(checked) => setKeepSignedIn(checked)}>
        Keep me signed in
      </Checkbox>
      <Button
        id="continue"
        className={styles.continue}
        type="submit"
        onPress={submit}
      >
        Log In
      </Button>
    </>
  );
};

export default LogIn;
