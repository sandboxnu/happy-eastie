import {
  Button,
  Checkbox,
  FormElement,
  Input,
  Spacer,
  Grid,
  Text
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import quizStyles from "../../components/quiz/Quiz.module.css";
import styles from "./admin.module.css";
import CryptoJS from "crypto-js";

import { useRouter } from "next/router";
import { NORMAL_IRON_OPTION } from "../../models/constants";
// import { withIronSessionSsr } from "iron-session/next";

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({req}) {
//     const user = req.session.user;

//     if (user &&  user.isAdmin) {
//       return {
//         redirect: {
//           destination: '/admin/dashboard',
//           permanent: false,
//         }
//       };
//     }
//     else {
//       return {
//         props: {}
//       }
//     }
//   }, NORMAL_IRON_OPTION)

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

  const handleSubmit = async () => {
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

  const handleForgotPassword = async () => {

  }

  return (
    <div className={styles.container}>
      <Grid.Container gap={2} alignItems="center" direction="column">
        <Grid>
          {message &&
            <div className={styles.errorMessageContainer}>
              <p className={styles.errorMessage}>{message}</p>
            </div>
          }

          <Spacer y={0.5} />

          <Text className={styles.adminLoginText}>Administrator Login</Text>

          <Spacer y={0.5} />

          <Input
            clearable
            bordered
            placeholder="Email"
            onChange={onEmailChange}
            className={styles.adminLoginInput}
            size="md"
            animated={false}
          />
          <Spacer y={0.5} />
          <Input.Password
            placeholder="Password"
            bordered
            onChange={onPasswordChange}
            className={styles.adminLoginInput}
            size="md"
            animated={false}
          />

          <Spacer y={0.5} />

          <Checkbox onChange={(checked) => setKeepSignedIn(checked)}>
            Keep me signed in
          </Checkbox>

          <Button
            id="continue"
            className={quizStyles.continue}
            type="submit"
            onPress={handleSubmit}
          >
            Log In
          </Button>

          <Button
            id="forgot-password"
            className={styles.forgotPassword}
            onPress={handleForgotPassword}
          >
            Forgot Password?
          </Button>
        </Grid>
      </Grid.Container>

      {/* <Spacer y={2.5} />
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
        className={quizStyles.continue}
        type="submit"
        onPress={submit}
      >
        Log In
      </Button> */}
    </div>
  );
};

export default LogIn;
