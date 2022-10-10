import React from "react";
import { Navbar, Dropdown, Image, useTheme } from "@nextui-org/react";

export default function Header() {
    return (
        <Navbar maxWidth={"fluid"} variant={"sticky"} disableShadow>
            <Navbar.Brand>
                <Image width={"auto"} height={"auto"} src="/HappyEastie.svg" />
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight="true" gap={90}>
                <Navbar.Link className="navbar-content" href="/quiz">Quiz</Navbar.Link>
                <Navbar.Link className="navbar-content" href="#">Community Events</Navbar.Link>
                <Navbar.Link className="navbar-content" href="#">Resources</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Dropdown>
                    <Dropdown.Button light>
                        <Image width={20} height={20} style={{ paddingRight: 4 }} src="/globe.svg" />
                        EN
                    </Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="fr">FR</Dropdown.Item>
                        <Dropdown.Item key="es">ES</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
        </Navbar>
    )
}
