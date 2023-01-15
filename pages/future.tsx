import Layout from "../components/Layout";
import {Text, Image, Col, Container} from "@nextui-org/react"
import NextImage from "next/image"
export default function FuturePage() {
    return (<Layout>
        <Container fluid css={{display: "flex", alignItems:"center", flexDirection:"column"}}>
        <Text h1 css={{color: "var(--secondary-text)"}}>Coming soon!</Text>
        <NextImage alt="Default Image" src="/homeImage2.svg" height={200} width={200}/>
        <Text css={{color: "var(--secondary-text)"}}>This page will be added in the future. Please enjoy the rest of the website!</Text>
        </Container>

    </Layout>)
}