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
    const [emailSent, setEmailSent] = useState<boolean>(false);

    const onEmailChange = (e: ChangeEvent<FormElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        setEmailSent(true);
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
                    >
                        <Text className={styles.loginButtonText}>Request a reset link</Text>
                    </Button>

                    <Spacer y={0.5} />

                    {emailSent &&
                        <>
                            <Spacer y={0.75} />
                            <div className={styles.forgotPasswordMessageContainer}>
                                <p className={styles.forgotPasswordMessage}>Password reset link sent</p>
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
