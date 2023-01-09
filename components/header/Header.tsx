import { Link, Navbar, Image } from "@nextui-org/react"
import NextLink from "next/link" 
import NextImage from "next/image"
import { HeaderContent } from "./HeaderTypes"
import HeaderDesktopContent from "./HeaderDesktopContent"
import HeaderCollapseMenu from "./HeaderCollapseMenu"

const items: HeaderContent[] = [
    { title: "Home", href: "/" },
    { title: "Quiz", href: "/quiz" },
    { title: "Community Events" },
    { title: "Resources", href: "/directory" },
    { title: "About", href: "/about" }
]

const Header = () => {
    return <Navbar maxWidth="fluid" variant="sticky" disableShadow style={{opacity: 1, backgroundColor: "white"}} >
              <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
        <NextLink href="/">
          <Link>
            <Image
             src="/HappyEastie.svg" 
             alt="HappyEastie" 
             width="119px" 
             height="20px" 
             as={NextImage}/>
          </Link>
        </NextLink>
      </Navbar.Brand>
      <HeaderDesktopContent items={items}/>
      <HeaderCollapseMenu items={items}/>
    </Navbar>
}
export default Header