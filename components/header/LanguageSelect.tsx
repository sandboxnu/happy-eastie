import { Dropdown, Navbar, Image } from "@nextui-org/react"
import NextImage from "next/image"
import { useState } from "react";

const LanguageSelect = () => {

    const [language, setLanguage] = useState("EN");

    return (<Navbar.Content>
        <Dropdown>
          <Dropdown.Button light>
            <Image width={20} height={20} style={{ paddingRight: 4 }} src="/globe.svg" alt="Select language" containerCss={{display: "flex", alignItems: "center", justifyContent: "center"}} as={NextImage}/>
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
      </Navbar.Content>)
}

export default LanguageSelect