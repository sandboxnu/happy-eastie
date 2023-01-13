import { CSSProperties, ReactNode } from "react"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import styles from "./Layout.module.css"
const Layout = ({children, includePadding = true}: {children: ReactNode, includePadding?: boolean}) => {

    const css : CSSProperties = includePadding? {padding: "0 2em"} : {}

    return (<div className={styles.container}>
        <Header/>
        <main className={styles.content} style={css}>{children}</main>
        <Footer/>
    </div>)
}

export default Layout