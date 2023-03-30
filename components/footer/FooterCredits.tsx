import { Grid, Link, Text, Spacer } from "@nextui-org/react";
import styles from "./Footer.module.css"

export default function FooterCredits() {
    return (
        <Grid
            css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 50
            }}
            xs={12}
            sm={12}
            md={4}
        >
            <div>
                <Text className={styles.footerLinkDescription}>Made by Sandbox</Text>
            </div>
            <Spacer y={0.5} />
            <div>
                <Link underline className={styles.footerLink} href='https://www.sandboxnu.com'>https://www.sandboxnu.com</Link>
            </div>
        </Grid>
    )
}
