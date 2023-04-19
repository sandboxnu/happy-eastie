import {
  Button,
  Checkbox,
  FormElement,
  Input,
  Spacer,
  Grid,
  Text,
  Row,
  Image
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import styles from "./admin.module.css";
import CryptoJS from "crypto-js";

import { useRouter } from "next/router";
import { NORMAL_IRON_OPTION } from "../../models/constants";
import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user && user.isAdmin) {
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
  }, NORMAL_IRON_OPTION)

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
    router.push("/admin/forgotPassword");
  }

  return (
    <div className={styles.page}>
      <div className={styles.loginContainer}>
        <Grid>
          <Spacer y={3} />

          <Image
            src="/HappyEastie.png"
            alt="HappyEastie"
            className={styles.logoImage}
          />

          {message &&
            <>
              <Spacer y={0.75} />
              <div className={styles.errorMessageContainer}>
                <p className={styles.errorMessage}>{message}</p>
              </div>
            </>
          }

          <Spacer y={1} />

          <Text className={styles.adminLoginText}>Administrator Login</Text>

          <Spacer y={0.75} />

          <Input
            clearable
            bordered
            placeholder="Email"
            onChange={onEmailChange}
            className={styles.adminLoginInput}
            size="md"
            animated={false}
          />
          <Spacer y={0.75} />
          <Input.Password
            placeholder="Password"
            bordered
            onChange={onPasswordChange}
            className={styles.adminLoginInput}
            size="md"
            animated={false}
          />

          <Spacer y={0.75} />

          <Checkbox onChange={(checked) => setKeepSignedIn(checked)}>
            Keep me signed in
          </Checkbox>

          <Spacer y={0.75} />

          <Button
            id="login"
            className={styles.loginButton}
            type="submit"
            onPress={handleSubmit}
          >
            <Text className={styles.loginButtonText}>Login</Text>
          </Button>

          <Spacer y={0.5} />

          <Row className={styles.forgotPasswordButtonContainer}>
            <Button
              id="forgot-password"
              className={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              Forgot Password?
            </Button>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default LogIn;
