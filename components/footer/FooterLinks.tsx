import { Grid, Link } from "@nextui-org/react";
import styles from "./Footer.module.css"
import NextLink from "next/link"
const items = [
    {title: "Quiz", href: "/quiz"},
    {title: "Resource", href: "/directory"},
    {title: "Community Events", href: "/future"},
    {title: "About Us", href: "/about"}
]

export default function FooterLinks() {
    return (
        <Grid xs={6}>
        <Grid.Container direction='row'> 

            {items.map(i => (
                <Grid key={i.title} xs={12} sm={6} justify="center">
                    <NextLink href={i.href}>
                    <Link className={styles.footerLink}>{i.title}</Link>  
                    </NextLink>
                </Grid>
            ))}
        </Grid.Container>
    </Grid>
    )
}