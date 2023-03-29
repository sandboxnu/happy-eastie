import type { NextPage } from "next";
// import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
// import { ResourceHeader } from "../../components/resources/ResourceHeader";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Card,
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
import { useState } from "react";
// import { ResourceDescription } from "../../components/resources/ResourceDescription";
// import Loading from "../../components/Loading";
// import Layout from "../../components/Layout";

const ResourcePageContent: NextPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const { resourceId } = router.query;
  const { resource, isLoading, error } = useResource(resourceId);

  // if (error) return <div>{error.message}</div>;
  // if (isLoading) return <Loading/>;
  // if (!resource)
  //   return <div>Internal server error: invalid resource loaded</div>;

  const fakeResource = {
    "name": "Fake Resource",
    "description": "I am fake",
    "summary": "I am fake but shorter",
    "category": [],
    "keywords": [],
    "incomeByHouseholdMembers": [],
    "documentationRequired": false,
    "headerImageUrl": "",
    "website": "www.fake.com",
    "phone": "617-555-5555",
    "email": "fake@fake.com",
    "address": "123 fake st",
    "location": {"type": "Point", "coordinates": []},
    "availableLanguages": [],
    "accessibilityOptions": [],
    "eligibilityInfo": ""
  }
  

  return (
    <>
      <Image
        src="https://www.boston.com/wp-content/uploads/2020/04/BackBay-47-Edit.jpeg?width=900"
        width="100%"
        height={254}
        objectFit="cover"
        alt="Resource header image"
      />
      <Spacer y={2} />
      <Container fluid>
        <Grid.Container justify="space-between" css={{ gap: "30px" }}>
          <Grid xs={12}>
            <Row justify="space-between" align="center">
              <FormInput
                size="xl"
                placeholder="Resource Name"
                editing={isEditing}
                value={fakeResource.name}
              />
              { !isEditing && <Button auto iconRight={<img src="/pencil.svg" />} onPress={
                () => { setIsEditing(true) }
              }>
                Edit Resource
              </Button>}
            </Row>
          </Grid>
          <Grid xs={12}>
            <Card.Divider css={{ bgColor: "DarkGray" }} />
          </Grid>
          <Grid xs={12} direction="column">
            <Text h3>Summary</Text>
            <FormInput
              fullWidth
              placeholder="Summary"
              size="md"
              editing={isEditing}
              value={fakeResource.summary}
            />
          </Grid>
          <Grid xs={12} direction="column">
            <Text h3>Description</Text>
            <FormInput multiLine editing={isEditing} placeholder={"Description"} />
          </Grid>

          <Grid xs={12} sm={3} direction="column">
            <Text h3>Contact</Text>
            <Row justify="flex-start" align="center" css={{ gap: "12px" }}>
              <img
                src="/emailfilled.svg"
                width="25px"
                style={{
                  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))",
                }}
              />
              <FormInput placeholder="Email" editing={isEditing} value={fakeResource.email} />
            </Row>
            <Spacer y={0.25} />
            <Row justify="flex-start" align="center" css={{ gap: "12px" }}>
              <img
                src="/phonefilled.svg"
                width="25px"
                style={{
                  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4))",
                }}
              />
              <FormInput placeholder="Phone" editing={isEditing} value={fakeResource.phone} />
            </Row>
          </Grid>

          <Grid xs={12} sm={3} direction="column">
            <Text h3>Website</Text>
            <FormInput placeholder="Website" editing={isEditing} value={fakeResource.website} />
            <Spacer y={1} />
            <Text h3>Address</Text>
            <FormInput placeholder="Street Address" editing={isEditing} value={fakeResource.address} />
          </Grid>

          <Grid xs={12} sm={3} direction="column">
            <Text h3>Categories</Text>
            <FormInput placeholder="Category" editing={isEditing} />
            <Spacer y={1} />
            <Text h3>Keywords</Text>
            <FormInput placeholder="Keyword" editing={isEditing} />
          </Grid>
        </Grid.Container>
      </Container>
      <Spacer y={1} />
      <Card.Divider css={{ bgColor: "DarkGray" }} />
      <Spacer y={1} />
      {isEditing && <Container fluid>
        <Row css={{ gap: "22px" }}>
          <Button
            onPress={() => {
              setIsEditing(false);
            }}
          >
            Save Changes
          </Button>
          <Button bordered>Cancel</Button>
        </Row>
      </Container>}
      <Spacer y={1} />
    </>
  );
};

const ResourcePage = () => {
  return <></>;
};
export default ResourcePageContent;
