import { Grid, Link, Text } from "@nextui-org/react";
import styles from "./Footer.module.css"

export default function FooterCredits() {
    return (
        <Grid xs={3} justify="flex-end" style={{paddingRight: 10}}>
        <Grid.Container direction='row'>
            <Grid xs={12} alignItems='flex-end'>
                <Text className={styles.footerLinkDescription}>Made by Sandbox</Text>
            </Grid>
            <Grid xs={12} alignItems='flex-start'>
                <Link underline className={styles.footerLink} href='https://www.sandboxnu.com'>https://www.sandboxnu.com</Link>
            </Grid>
        </Grid.Container>
    </Grid>
    )
}