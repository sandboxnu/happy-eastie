import { Navbar } from "@nextui-org/react"
import { HeaderContent } from "./HeaderTypes"
import NextLink from 'next/link'
const HeaderCollapseMenu = ({items}: {items: HeaderContent[]}) => {
    return (<Navbar.Collapse style={{opacity: 1, backgroundColor: "white"}} showIn="sm" >
        {items.map((item, index) => (
          <Navbar.CollapseItem key={item.title}>
            <NextLink
              color="inherit"
              href={item.href ?? "#"}
            >
              {item.title}
            </NextLink>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>)
}

export default HeaderCollapseMenu