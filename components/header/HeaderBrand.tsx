import { Link, Navbar, Image } from "@nextui-org/react"
import NextLink from "next/link"
import NextImage from "next/image"

const HeaderBrand = () => {
    return (<Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
        <NextLink href="/">
          <Link>
            <Image
             src="/HappyEastie.svg" 
             alt="HappyEastie" 
             width="220px" 
             css = {{pr: 10}}
            />
          </Link>
        </NextLink>
      </Navbar.Brand>)
}

export default HeaderBrand