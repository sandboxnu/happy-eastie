import { Navbar } from "@nextui-org/react"
import { HeaderContent } from "./HeaderTypes"
import NextLink from "next/link"
import styles from "./Header.module.css"
import { useRouter } from "next/router"

const HeaderDesktopContent = ({ items }: { items: HeaderContent[] }) => {
  const router = useRouter()

  return (
    <Navbar.Content enableCursorHighlight="true" gap={60} hideIn="sm" className={styles.navbarContent} activeColor="primary">
      {items.map(item =>
        <Navbar.Item
          key={item.title}>
          <NextLink href={`/${router.locale}${item.href ?? "#"}`}>
            {item.title}
          </NextLink>
        </Navbar.Item>)}
    </Navbar.Content>
  )
}

export default HeaderDesktopContent
