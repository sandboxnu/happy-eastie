import { Navbar } from "@nextui-org/react"
import { HeaderContent } from "./HeaderTypes"
import HeaderDesktopContent from "./HeaderDesktopContent"
import HeaderCollapseMenu from "./HeaderCollapseMenu"
import HeaderBrand from "./HeaderBrand"
import styles from "./Header.module.css"
import LanguageSelect from "../LanguageSelect"

const items: HeaderContent[] = [
  { title: "Home", href: "/" },
  { title: "Quiz", href: "/quiz" },
  { title: "Community Events", href: "/future" },
  { title: "Resources", href: "/directory" },
  { title: "About", href: "/about" }
]

const Header = () => {
  return (
    <Navbar maxWidth="fluid" variant="sticky" disableShadow className={styles.navbar}>
      <HeaderBrand />
      <HeaderDesktopContent items={items} />
      <Navbar.Content>
        <LanguageSelect />
      </Navbar.Content>
      <HeaderCollapseMenu items={items} />
    </Navbar>
  )
}

export default Header
