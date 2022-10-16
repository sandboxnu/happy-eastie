import React from "react";
import { Navbar, Dropdown, Image, useTheme, Link } from "@nextui-org/react";

export default function Header() {
  const collapseItems = [
    "Quiz",
    "Community Events",
    "Resources",
    "About"
  ];

    return (
        <Navbar maxWidth={"fluid"} variant={"sticky"} disableShadow>
            <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
                <Image alt="HappyEastie" height="20px" src="/HappyEastie.svg" />
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight="true" gap={90} hideIn="xs">
                <Navbar.Link className="navbar-content" href="/quiz">Quiz</Navbar.Link>
                <Navbar.Link className="navbar-content" href="#">Community Events</Navbar.Link>
                <Navbar.Link className="navbar-content" href="#">Resources</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Dropdown>
                    <Dropdown.Button light>
                        <Image width={20} height={20} style={{ paddingRight: 4 }} src="/globe.svg" alt="Select language" />
                        EN
                    </Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="fr">FR</Dropdown.Item>
                        <Dropdown.Item key="es">ES</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
            <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
        </Navbar>
    )
}
