import { Button, Container, Divider, FormElement, Input, Row, Spacer, Text } from "@nextui-org/react";
import { AdminDashboardHeader } from "../../../components/admin/dashboard/adminDashboardHeader";
import { withIronSessionSsr } from "iron-session/next";
import { NORMAL_IRON_OPTION } from "../../../models/constants";
import { FormEvent, useState } from "react";

export const getServerSideProps = withIronSessionSsr(ctx => {
    const user = ctx.req.session.user;

    if (!user || user.isAdmin !== true) {
        return {
          redirect: {
            destination: '/admin',
            permanent: false,
          }
        };
    } else {
        return {
            props: {}
        }
    }
}, NORMAL_IRON_OPTION)
export default function InvitePage() {
    const [email, setEmail] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [isError, setIsError] = useState(false)
    return <>
        <AdminDashboardHeader/>
        <Container>
            <Spacer y={2}/>
            <Text h3>Send Admin Invite</Text>
            <Spacer y={1}/>
            <Divider/>
            <Spacer y={3}/>
            <Container css={{
                px:"30%"
            }}>
                <Text b>Recipient Email</Text>
                <Row>
                    <Input placeholder="Email" fullWidth onInput={(e) => {
                        setEmail(e.currentTarget.value)
                    }}/>
                    <Button onPress={async () => {
                        if(!isSending) {
                            setIsSending(true)
                            setResponseMessage("")
                            setIsError(false)

                            const requestBody = {
                                email
                            }
                            const settings : RequestInit = {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(requestBody)
                            }

                            const response = await fetch("/api/admin/invite", settings)

                            
                            if(response.status !== 201) {
                                setIsError(true)
                            }
                            setResponseMessage((await response.json()).message)
                            setIsSending(false)
                        }
                    }}>Send</Button>
                </Row>
                {responseMessage && <Text css={{color: isError? "red": "black"}}>{responseMessage}</Text>}
            </Container>
        </Container>
    </>
}