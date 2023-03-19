import { Grid, Link, Col, Row, Spacer } from "@nextui-org/react";
import styles from "./Footer.module.css"
import NextLink from "next/link"

type LinkObj = {
    title: string, 
    href: string
}

const items: LinkObj[] = [
    {title: "Quiz", href: "/quiz"},
    {title: "Community Events", href: "/future"},
    {title: "Resource", href: "/directory"},
    {title: "About Us", href: "/about"}
]

export default function FooterLinks() {
    return (
        <Row css={{ml: 60, display: "flex", flexDirection: "row"}}> 
            {mapLinksToColumn(items).map((i:LinkPair) => (
                <Col key={i.firstLink.title} css={{mr: 20, display: "flex", flexDirection:"column", justifyContent:"flex-start"}}>
                    <NextLink href={i.firstLink.href}>
                    <Link className={styles.footerLink}>{i.firstLink.title}</Link>  
                    </NextLink>
                    <Spacer y={0.5}/>
                    { i.secondLink && 
                        <NextLink href={i.secondLink.href}>
                        <Link className={styles.footerLink}>{i.secondLink.title}</Link>  
                        </NextLink>
                    }
                </Col>
            ))}
        </Row>
    )
}

type LinkPair = {
    firstLink: LinkObj,
    secondLink: LinkObj | undefined
}

function mapLinksToColumn(arr: LinkObj[]): LinkPair[] {
    let result: LinkPair[] = []
    for (let i = 0; i < arr.length; i+=2) {
        if (i+1 < arr.length) {
            result.push({"firstLink": arr[i], "secondLink": arr[i+1]})
        } else {
            result.push({"firstLink": arr[i], "secondLink": undefined})
        }
    }

    return result
}