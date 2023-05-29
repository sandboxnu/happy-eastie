import { Grid, Link, Spacer } from "@nextui-org/react";
import styles from "./Footer.module.css"
import NextLink from "next/link"

type LinkObj = {
    title: string,
    href: string
}

const items: LinkObj[] = [
    { title: "Quiz", href: "/quiz" },
    { title: "Community Events", href: "/future" },
    { title: "Resources", href: "/directory" },
    { title: "About Us", href: "/about" }
]

export default function FooterLinks() {
    return (
        <Grid
            css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
                // marginTop: 20
            
            }}
            xs={12}
            sm={12}
            md={4}
        >
            {mapLinksToColumn(items).map((i: LinkPair) => (
                <div key={i.firstLink.title} className={styles.footerLinkColumn}>
                    <NextLink href={i.firstLink.href}>
                        <Link className={styles.footerLink}>{i.firstLink.title}</Link>
                    </NextLink>
                    <Spacer y={0.5} />
                    {i.secondLink &&
                        <NextLink href={i.secondLink.href}>
                            <Link className={styles.footerLink}>{i.secondLink.title}</Link>
                        </NextLink>
                    }
                </div>
            ))}
        </Grid>
    )
}

type LinkPair = {
    firstLink: LinkObj,
    secondLink: LinkObj | undefined
}

function mapLinksToColumn(arr: LinkObj[]): LinkPair[] {
    let result: LinkPair[] = []
    for (let i = 0; i < arr.length; i += 2) {
        if (i + 1 < arr.length) {
            result.push({ "firstLink": arr[i], "secondLink": arr[i + 1] })
        } else {
            result.push({ "firstLink": arr[i], "secondLink": undefined })
        }
    }

    return result
}
