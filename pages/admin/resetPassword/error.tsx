import { Grid, Spacer, Input, Button, Text} from "@nextui-org/react";
import { useRouter } from "next/router";
import styles from "../admin.module.css";


const SignupError = () => {
    
    const router = useRouter();
    
    return (
        <div className={styles.page}>
            <div className={styles.successContainer}>
               

                    <Text className={styles.successText}>The password reset link used is either invalid or it expired. Please try again.</Text>

                    <Spacer y={0.75} />

                   

                    <Spacer y={0.75} />

                    <Button
                        id="login"
                        className={styles.loginButton}
                        type="submit"
                        onPress={() => {router.push("/admin");}}
                    >
                        <Text className={styles.loginButtonText}>Go to login</Text>
                    </Button>

                    <Spacer y={0.5} />

                   

               
            </div>
        </div>
    )
}

export default SignupError;