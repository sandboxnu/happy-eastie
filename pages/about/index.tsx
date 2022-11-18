import { Grid, Spacer, Text } from "@nextui-org/react"
import { NextPage } from "next"
import Header from "../../components/header"
import style from "../../styles/about.module.css"
const About : NextPage = () => {
    return (    
    <div>
        <Header />
        <div className={style.container}>
            <Spacer y={3}></Spacer>
            <Text h1>About Us</Text>
            <Spacer y={2}></Spacer>
            <Text>HappyEastie is a tool that helps match you with helpful resources that you qualify for. Our mission is to make this search as easy as possible, creating a community hub for information. 
            </Text>
            <Text h2>You can:</Text>
            <ul>
                <li>
                    <Text>Follow the path of answering questions to get resources that you’re eligible for</Text>
                </li>
                <li>
                    <Text>
                    Discover new and relevant events in the community
                    </Text>
                </li>
                <li>
                    <Text>Manually search our database for what you’re looking for</Text>    
                </li>
            </ul>
            <Text h2>On The Way:</Text>
            <ul>
                <li>
                    <Text>Multiple Language Support</Text>
                </li>
                <li>
                    <Text>
                    Accessibility/ADA Info for Resource Sites
                    </Text>
                </li>
                <li>
                    <Text>Linguistic Access Info for Resource Sites</Text>    
                </li>
                <li>
                    <Text>Resource Site Hours</Text>
                </li>
                <li>
                    <Text>Suggestions for Traveling to a Resource Site</Text>
                </li>
            </ul>
        </div>
      </div>)
}

export default About