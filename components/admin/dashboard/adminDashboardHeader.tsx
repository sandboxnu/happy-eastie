import { Navbar, Text } from "@nextui-org/react"

export const AdminDashboardHeader = () => {
    return <Navbar height={143} maxWidth="fluid" disableShadow disableBlur containerCss={{backgroundColor: "$primary"}}>
        <Navbar.Brand>
            <Text color="white" b size={38}>Admin Dashboard</Text>
        </Navbar.Brand>
    </Navbar>
}