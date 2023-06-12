import { Button, Container, Divider, Input, Row, Spacer, Text } from "@nextui-org/react";
import { AdminDashboardHeader } from "../../../components/admin/dashboard/adminDashboardHeader";
import { withIronSessionSsr } from "iron-session/next";
import { NORMAL_IRON_OPTION } from "../../../models/constants";

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
                    <Input placeholder="Email" fullWidth/>
                    <Button>Send</Button>
                </Row>
            </Container>
        </Container>
    </>
}