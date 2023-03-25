import type { NextPage } from "next";
// import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
// import { ResourceHeader } from "../../components/resources/ResourceHeader";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Col,
  Container,
  Grid,
  Image,
  Input,
  Row,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import styles from "./[resourceId].module.css";
import { useResource } from "../../../hooks/useResource";
import { FormInput } from "../../../components/admin/dashboard/InputField";
// import { ResourceDescription } from "../../components/resources/ResourceDescription";
// import Loading from "../../components/Loading";
// import Layout from "../../components/Layout";

const ResourcePageContent: NextPage = () => {
  const router = useRouter();
  const { resourceId } = router.query;
  const { resource, isLoading, error } = useResource(resourceId);

  // if (error) return <div>{error.message}</div>;
  // if (isLoading) return <Loading/>;
  // if (!resource)
  //   return <div>Internal server error: invalid resource loaded</div>;

  return (
    <Container fluid>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={12} direction="column">
          <Text h3>Summary</Text>
          <Textarea bordered borderWeight="light" fullWidth color="primary" />
        </Grid>
        <Spacer y={1} />
        <Grid xs={12} direction="column">
          <Text h3>Description</Text>
          <Textarea bordered borderWeight="light" fullWidth color="primary" />
        </Grid>

        <Grid xs={12} sm={3} direction="column">
          <Text h3>Contact</Text>
          <Row justify="flex-start" align="center" css={{ gap: "12px" }}>
            <img src="/emailfilled.svg" width="25px" style={{filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))"}} />
            <FormInput placeholder="Email" />
          </Row>
          <Spacer y={0.25} />
          <Row justify="flex-start" align="center" css={{ gap: "12px" }}>
            <img src="/phonefilled.svg" width="25px" style={{filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))"}} />
            <FormInput placeholder="Phone" />
          </Row>
        </Grid>

        <Grid xs={12} sm={3} direction="column">
          <Text h3>Website</Text>
          <FormInput placeholder="Website" />

          <Text h3>Address</Text>
          <FormInput placeholder="Street Address" />

          <FormInput placeholder="Apartment, suite, etc." />
          <FormInput placeholder="City" />

          <Row css={{gap: "10px"}}>
            <Col>
              <FormInput placeholder="State" fullWidth />
            </Col>
            <Col>
              <FormInput placeholder="Zip Code" fullWidth />
            </Col>
          </Row>
        </Grid>

        <Grid xs={12} sm={3} direction="column">
          <Text h3>Categories</Text>
          <FormInput placeholder="Category" />

          <Text h3>Keywords</Text>
          <FormInput placeholder="Keyword" />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

const ResourcePage = () => {
  return <></>;
};
export default ResourcePageContent;
