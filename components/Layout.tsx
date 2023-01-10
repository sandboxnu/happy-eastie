import { ReactNode } from "react"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import styles from "./Layout.module.css"
const Layout = ({children}: {children: ReactNode}) => {
    return (<div className={styles.container}>
        <Header/>
        <main className={styles.content}>{children}</main>
        <Footer/>
    </div>)
}

export default Layout