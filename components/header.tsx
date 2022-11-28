import React from "react";
import { Navbar, Dropdown, Image, useTheme, Link, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter()
  const { pathname, asPath, query } = router  

  const changeLanguage = (key: string) => {
    router.push({ pathname, query }, asPath, { locale: key })
  }

  const collapseItems = [
    { title: "Home", href: "/"},
    { title: "Quiz", href: "/quiz" },
    { title: "Community Events" },
    { title: "Resources", href: "/directory" },
    { title: "About", href: "/about"}
  ];

  return (
    <Navbar maxWidth={"fluid"} variant={"sticky"} disableShadow>
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
        <Link href="/">
          <Image alt="HappyEastie" height="20px" src="/HappyEastie.svg" />
        </Link>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight="true" gap={90} hideIn="xs" className="navbar-content" activeColor="primary">
        {collapseItems.map(item => 
          <Navbar.Link 
          key={item.title}
          href={`/${router.locale}${item.href ?? "#"}`}>
            {item.title}
          </Navbar.Link>)}
      </Navbar.Content>
      <Navbar.Content>
        <Dropdown>
          <Dropdown.Button light>
            <Image width={20} height={20} style={{ paddingRight: 4 }} src="/globe.svg" alt="Select language" />
            EN
          </Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions" onAction={(key) => {
            changeLanguage(key.toString())
          }}>
            <Dropdown.Item key="en">English</Dropdown.Item>
            <Dropdown.Item key="fr">français</Dropdown.Item>
            <Dropdown.Item key="es">español</Dropdown.Item>
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
              href={`/${router.locale}${item.href ?? "#"}`}
            >
              {item.title}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}
