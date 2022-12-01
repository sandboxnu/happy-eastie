import React from "react";
import { Navbar, Dropdown, Image, Link } from "@nextui-org/react";

export default function Header() {
  const collapseItems = [
    { title: "Home", href: "/" },
    { title: "Quiz", href: "/quiz" },
    { title: "Community Events" },
    { title: "Resources", href: "/directory" },
    { title: "About", href: "/about" }
  ];

  return (
    <Navbar maxWidth={"fluid"} variant={"sticky"} disableShadow>
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
        <Link href="/">
          <div>
            <Image src="/HappyEastie.svg" alt="HappyEastie" width="119px" height="20px" />
          </div>
        </Link>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight="true" gap={90} hideIn="sm" className="navbar-content" activeColor="primary">
        {collapseItems.map(item =>
          <Navbar.Link
            key={item.title}
            href={item.href ?? "#"}>
            {item.title}
          </Navbar.Link>)}
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
          <Navbar.CollapseItem key={item.title}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href={item.href ?? "#"}
            >
              {item.title}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}
