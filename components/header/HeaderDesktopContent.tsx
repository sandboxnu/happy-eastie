import { Navbar } from "@nextui-org/react"
import { HeaderContent } from "./HeaderTypes"
import NextLink from "next/link"
import styles from "./Header.module.css"

const HeaderDesktopContent = ({items}: {items: HeaderContent[]}) => {
    return (<Navbar.Content enableCursorHighlight="true" gap={90} hideIn="sm" className={styles.navbarContent} activeColor="primary">
    {items.map(item =>
      <Navbar.Item
        key={item.title}>
        <NextLink href={item.href ?? "#"}>
            {item.title}
        </NextLink>
      </Navbar.Item>)}
  </Navbar.Content>)
}

export default HeaderDesktopContent