import { Grid } from '@nextui-org/react';
import styles from "./Footer.module.css"
import FooterBrand from './FooterBrand';
import FooterCredits from './FooterCredits';
import FooterLinks from './FooterLinks';

export default function Footer() {

    return (
        <Grid.Container direction='row' className={styles.footerGrid}>
            <FooterBrand/>
            <FooterLinks/>
            <FooterCredits/>
        </Grid.Container>
    )

}