import { Dropdown, Navbar } from "@nextui-org/react"
import NextImage from "next/image"
import { useState } from "react";

const LanguageSelect = () => {

    const [language, setLanguage] = useState("EN");

    return (
        <Dropdown>
          <Dropdown.Button light>
            <NextImage width={20} height={20} src="/globe.svg" alt="Select language"/>
            <div style={{width: 4}}></div> {/* a spacer because normal padding doesn't seem to work*/}
            {language}
          </Dropdown.Button>
          <Dropdown.Menu aria-label="single selection actions"
              disabledKeys={["FR", "ES"]}
              disallowEmptySelection
              selectedKeys={language}
              selectionMode='single'
              onSelectionChange={(key:any) => setLanguage(key.valueOf())}>
            <Dropdown.Item key="EN">EN</Dropdown.Item>
            <Dropdown.Item key="FR">FR</Dropdown.Item>
            <Dropdown.Item key="ES">ES</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
}

export default LanguageSelect