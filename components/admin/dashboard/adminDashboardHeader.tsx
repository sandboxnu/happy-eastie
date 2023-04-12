import { Button, Navbar, Text } from "@nextui-org/react"
import { useRouter } from "next/router";

export const AdminDashboardHeader = () => {
    const router = useRouter()
    const logout = async () => {
        const requestSettings = {
            method: "POST",
            body: JSON.stringify({type: "logout"}),
            headers: { "Content-Type": "application/json" },
          };
        const response = await fetch("/api/admin/authentication", requestSettings);
        if (response.status !== 200) { 
        } else {
            router.push("/admin")
        }
    }
    return <Navbar height={143} maxWidth="fluid" disableShadow disableBlur containerCss={{backgroundColor: "$primary"}}>
        <Navbar.Brand>
            <Text color="white" b size={38}>Admin Dashboard</Text>
        </Navbar.Brand>
        <Navbar.Content>
            <Button onPress={(e) => logout()}>Log out</Button>
        </Navbar.Content>
    </Navbar>
}