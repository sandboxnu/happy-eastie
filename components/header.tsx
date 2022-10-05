import React from "react";
import { Navbar, Button, Link, Text, Card, Radio, Dropdown, Image } from "@nextui-org/react";

export default function Header() {
    return (
        <Navbar variant={"sticky"}>
            <Navbar.Brand>
                <Image width={"auto"} height={"auto"} src="/HappyEastie.svg"/>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Link color="secondary" href="/quiz">Quiz</Navbar.Link>
                <Navbar.Link color="secondary" href="#">Community Events</Navbar.Link>
                <Navbar.Link color="secondary" href="#">Resources</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Item>
                <Dropdown>
                    <Dropdown.Button light>EN</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="fr">FR</Dropdown.Item>
                        <Dropdown.Item key="es">ES</Dropdown.Item>
                    </Dropdown.Menu>
                 </Dropdown>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}
