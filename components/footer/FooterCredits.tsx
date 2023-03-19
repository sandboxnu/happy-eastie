import { Grid, Link, Text, Spacer } from "@nextui-org/react";
import styles from "./Footer.module.css"

export default function FooterCredits() {
    return (
        <Grid justify="flex-start" style={{paddingRight: 10, marginTop: 50, marginRight:70}}>
            <Grid xs={12} alignItems='flex-end'>
                <Text className={styles.footerLinkDescription}>Made by Sandbox</Text>
            </Grid>
            <Spacer y={0.5}/>
            <Grid xs={12} alignItems='flex-start'>
                <Link underline className={styles.footerLink} href='https://www.sandboxnu.com'>https://www.sandboxnu.com</Link>
            </Grid>
    </Grid>
    )
}