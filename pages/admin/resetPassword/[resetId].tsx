import { GetServerSideProps } from "next";
import { isPasswordResetValid } from "../../../util/utils";
import { FormElement, Grid, Spacer, Input, Button, Image, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import styles from "../admin.module.css";
import { useState, ChangeEvent } from "react";
import CryptoJS from "crypto-js";
export const getServerSideProps : GetServerSideProps = async ({params}) => {
    if(typeof params?.resetId === "string") {
        const resetId = params.resetId

        if(await isPasswordResetValid(resetId)) {
            return { props: {resetId}}
        }
    }

    return {redirect: {destination: "/admin/resetPassword/error", permanent: false}}
}

const ResetPassword = ({resetId}: {resetId: string}) => {
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [retypePass, setRetypePassword] = useState("");
    const router = useRouter();

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

        else {
            const hashedPassword = CryptoJS.SHA256(password).toString()
            const requestBody = JSON.stringify({
                hashedPassword,
                resetId
            });
            const requestSettings = {
                method: "POST",
                body: requestBody,
                headers: { "Content-Type": "application/json" },
            };
            const response = await fetch("/api/admin/resetPassword", requestSettings);
            if (!response.ok) {
                response.json().then(val => setMessage("Reset failed: " + val.message))
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
                            <div className={styles.errorMessageContainer} style={{width: 382}}>
                                <p className={styles.errorMessage}>{message}</p>
                            </div>
                        </>
                    }

                    <Spacer y={1} />

                    <Text className={styles.adminLoginText}>Password Reset</Text>

                    <Spacer y={0.75} />

                    <Spacer y={0.75} />
                    <Input.Password
                        placeholder="Enter new password"
                        bordered
                        onChange={onPasswordChange}
                        className={styles.adminLoginInput}
                        size="md"
                        animated={false}
                    />

                    <Spacer y={0.75} />

                    <Input.Password
                        placeholder="Re-type new password"
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
                        <Text className={styles.loginButtonText}>Reset Password</Text>
                    </Button>

                    <Spacer y={0.5} />


                </Grid>
            </div>
        </div>
    )
};

export default ResetPassword