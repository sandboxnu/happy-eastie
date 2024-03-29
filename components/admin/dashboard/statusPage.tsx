import { Spacer, Button, Text} from "@nextui-org/react";
import { useRouter } from "next/router";
import styles from "../../../pages/admin/admin.module.css";


const StatusPage = ({message}: {message: string}) => {
    
    const router = useRouter();
    
    return (
        <div className={styles.page}>
            <div className={styles.successContainer}>
               

                    <Text className={styles.successText}>{message}</Text>

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

export default StatusPage;