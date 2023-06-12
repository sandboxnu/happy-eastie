import { Button, Checkbox, Grid, Input, Row, Spacer, Image, Text, FormElement } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import styles from "../admin.module.css";
import CryptoJS from "crypto-js";

const SignUp = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePass, setRetypePassword] = useState("");
    const router = useRouter();



    const onEmailChange = (e: ChangeEvent<FormElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<FormElement>) => {
        setPassword(e.target.value);
    };

    const onRetypePasswordChange = (e: ChangeEvent<FormElement>) => {
        setRetypePassword(e.target.value);
    };

    const handleSubmit = async () => {
        setMessage("");
        // checks that passwords are not different
        if (retypePass !== password) {
            setMessage("Passwords do not match.");
        }
        //TODO: check that email address isn't already in use

        else {
            const hashedPassword = CryptoJS.SHA256(password).toString()
            const requestBody = JSON.stringify({
                type: "signup",
                email,
                hashedPassword
            });
            const requestSettings = {
                method: "POST",
                body: requestBody,
                headers: { "Content-Type": "application/json" },
            };
            const response = await fetch("/api/admin/authentication", requestSettings);
            if (response.status !== 200) {
                response.json().then(val => setMessage("Authentication failed: " + val.message))
                ;
              } else {
                router.push("/admin/signUp/success");
              }
        }
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

                    <Text className={styles.adminLoginText}>Create an admin account</Text>

                    <Spacer y={0.75} />

                    <Input
                        clearable
                        bordered
                        placeholder="Email address"
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

                    <Input.Password
                        placeholder="Re-type password"
                        bordered
                        onChange={onRetypePasswordChange}
                        className={styles.adminLoginInput}
                        size="md"
                        animated={false}
                    />

                    <Spacer y={0.75} />


                    <Spacer y={0.75} />

                    <Button
                        id="login"
                        className={styles.loginButton}
                        type="submit"
                        onPress={handleSubmit}
                    >
                        <Text className={styles.loginButtonText}>Create admin account</Text>
                    </Button>

                    <Spacer y={0.5} />


                </Grid>
            </div>
        </div>
    )
};



export default SignUp;