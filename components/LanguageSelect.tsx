import { Dropdown, Navbar } from "@nextui-org/react"
import NextImage from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";

const LanguageSelect = () => {
  const router = useRouter()
  const { pathname, asPath, query } = router 

  const changeLanguage = (key: string) => {
    console.log(key)
    setLanguage(key)
    router.push({ pathname, query }, asPath, { locale: key.toLowerCase() })
  }

    const [language, setLanguage] = useState(router.locale?.toUpperCase());

    return (
        <Dropdown>
          <Dropdown.Button light>
            <NextImage width={20} height={20} src="/globe.svg" alt="Select language"/>
            <div style={{width: 4}}></div> {/* a spacer because normal padding doesn't seem to work*/}
            {language}
          </Dropdown.Button>
          <Dropdown.Menu aria-label="single selection actions"
              disallowEmptySelection
              selectedKeys={language}
              selectionMode='single'
              onAction={(key) => {
                changeLanguage(key.toString())
              }}>
            <Dropdown.Item key="EN">EN</Dropdown.Item>
            <Dropdown.Item key="FR">FR</Dropdown.Item>
            <Dropdown.Item key="ES">ES</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
}

export default LanguageSelect