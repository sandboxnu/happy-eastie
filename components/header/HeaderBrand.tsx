import { Link, Navbar, Image, Spacer } from "@nextui-org/react"
import NextLink from "next/link"

const HeaderBrand = () => {
  return (
    <Navbar.Brand>
      <Navbar.Toggle aria-label="toggle navigation" showIn="sm" css={{ zoom: 1.25 }} />
      <Spacer x={1} />
      <NextLink href="/">
        <Link>
          <Image
            src="/HappyEastie.svg"
            alt="HappyEastie"
            width="220px"
            css={{ pr: 10 }}
          />
        </Link>
      </NextLink>
    </Navbar.Brand>
  )
}

export default HeaderBrand
