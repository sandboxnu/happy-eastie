import React from "react";
import { Navbar, Dropdown, Image } from "@nextui-org/react";

export default function Header() {
    return (
        <Navbar maxWidth={"fluid"} variant={"sticky"}>
            <Navbar.Brand>
                <Image width={"auto"} height={"auto"} src="/HappyEastie.svg"/>
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight="true" gap={90}>
                <Navbar.Link color="secondary" href="/quiz">Quiz</Navbar.Link>
                <Navbar.Link color="secondary" href="#">Community Events</Navbar.Link>
                <Navbar.Link color="secondary" href="#">Resources</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Image width={20} height={20} src="/globe.svg"/>
                <Dropdown>
                    <Dropdown.Button light>EN</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="fr">FR</Dropdown.Item>
                        <Dropdown.Item key="es">ES</Dropdown.Item>
                    </Dropdown.Menu>
                 </Dropdown>
            </Navbar.Content>
        </Navbar>
    )
}
