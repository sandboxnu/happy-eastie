import {
    Button,
    FormElement,
    Input,
    Spacer,
    Grid,
    Text,
    Image
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import styles from ".././admin.module.css";

import { useRouter } from "next/router";

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);
    const [error, setError] = useState("")

    const onEmailChange = (e: ChangeEvent<FormElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        setIsSending(true)
        setError("")

        const requestBody = JSON.stringify({
            email
        });
        const requestSettings = {
            method: "POST",
            body: requestBody,
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch("/api/admin/forgotPassword", requestSettings);

        if(response.ok) {
            router.push("/admin/forgotPassword/success")
        }else {
            setError((await response.json()).message)
            setIsSending(false)
        }
    };

    const handleBack = async () => {
        router.push("/admin")
    }

    return (
        <div className={styles.page}>
            <div className={styles.forgotPasswordContainer}>
                <Grid>
                    <Spacer y={1} />
                    <div className={styles.backContainer}>
                        <Image
                            src="/backArrow.png"
                            alt="BackArrow"
                            className={styles.backArrowImage}
                        />
                        <button className={styles.backButton} type="submit" id="back" onClick={handleBack}>
                            {"Back"}
                        </button>
                    </div>

                    <Spacer y={6} />

                    <Text className={styles.adminLoginText}>Forgot Password?</Text>

                    <Spacer y={1} />

                    <Input
                        clearable
                        bordered
                        placeholder="Email"
                        onChange={onEmailChange}
                        className={styles.adminLoginInput}
                        size="md"
                        animated={false}
                    />

                    <Spacer y={1} />

                    <Button
                        className={styles.loginButton}
                        type="submit"
                        onPress={handleSubmit}
                        disabled={isSending}
                    >
                        <Text className={styles.loginButtonText}>Request a reset link</Text>
                    </Button>

                    <Spacer y={0.5} />

                    {error &&
                        <>
                            <Spacer y={0.75} />
                            <div className={styles.forgotPasswordMessageContainer}>
                                <p className={styles.forgotPasswordMessage}>{error}</p>
                            </div>
                        </>
                    }

                    <Spacer y={3} />
                </Grid>
            </div>
        </div>
    );
};

export default ForgotPassword;
