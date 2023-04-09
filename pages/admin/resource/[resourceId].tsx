import type { NextPage } from "next";
// import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
// import { ResourceHeader } from "../../components/resources/ResourceHeader";
import {
  Button,
  Card,
  Container,
  FormElement,
  Grid,
  Image,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useResource } from "../../../hooks/useResource";
import { useEffect, useState } from "react";
import { Resource } from "../../../models/types2";

const ResourcePageContent: NextPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const { resourceId } = router.query;
  const { resource, isLoading, error } = useResource(resourceId);
  // This is the resource as it's being edited
  // - Upon saving, this will be applied to the actual resource
  // - Upon cancel, this will be discarded
  const [inputtedResource, setInputtedResource] = useState<Resource>({
    name: "",
    description: "",
    summary: "",
    category: [],
    keywords: [],
    incomeByHouseholdMembers: [],
    documentationRequired: false,
    headerImageUrl: "",
    website: "",
    phone: "",
    email: "",
    address: "",
    location: { type: "Point", coordinates: [] },
    availableLanguages: [],
    accessibilityOptions: [],
    eligibilityInfo: "",
  });

  // Set the inputted resource to the resource when it is loaded
  useEffect(() => {
    if (resource) setInputtedResource(resource);
  }, [resource]);

  const LoadingScreen = () => {
    return (
      <Grid.Container>
        <Grid xs={12} direction="column" justify="center" alignItems="center">
          <Spacer y={2} />
          <Loading size="xl" />
          <Text h3>Loading resources...</Text>
        </Grid>
      </Grid.Container>
    );
  };

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <LoadingScreen />;
  if (!resource)
    return <div>Internal server error: invalid resource loaded</div>;

  const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log({ ...inputtedResource, [name]: value });
    setInputtedResource((values) => ({ ...values, [name]: value }));
  };

  const saveResource = async (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Save the resource
    setIsEditing(false);
  };

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
      <form onSubmit={saveResource}>
        <Container fluid>
          <Grid.Container justify="space-between" css={{ gap: "30px" }}>
            <Grid xs={12}>
              <Row justify="space-between" align="center">
                <Input
                  bordered
                  color="primary"
                  name="name"
                  size="xl"
                  placeholder="Resource Name"
                  readOnly={!isEditing}
                  value={inputtedResource.name}
                  onChange={handleInputChange}
                />
                {!isEditing && (
                  <Button
                    auto
                    iconRight={<img src="/pencil.svg" />}
                    onPress={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit Resource
                  </Button>
                )}
              </Row>
            </Grid>
            <Card.Divider />
            <Grid xs={12} direction="column">
              <Text h3>Summary</Text>
              <Input
                bordered
                color="primary"
                name="summary"
                fullWidth
                placeholder="Summary"
                size="md"
                readOnly={!isEditing}
                value={resource.summary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} direction="column">
              <Text h3>Description</Text>
              <Textarea
                bordered
                color="primary"
                name="description"
                readOnly={!isEditing}
                placeholder="Description"
                value={resource.description}
                onChange={handleInputChange}
              />
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
                <Input
                  bordered
                  color="primary"
                  name="email"
                  placeholder="Email"
                  readOnly={!isEditing}
                  value={resource.email}
                  onChange={handleInputChange}
                />
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
                <Input
                  bordered
                  color="primary"
                  name="phone"
                  placeholder="Phone"
                  readOnly={!isEditing}
                  value={resource.phone}
                  onChange={handleInputChange}
                />
              </Row>
            </Grid>

            <Grid xs={12} sm={3} direction="column">
              <Text h3>Website</Text>
              <Input
                bordered
                color="primary"
                name="website"
                placeholder="Website"
                readOnly={!isEditing}
                value={resource.website}
                onChange={handleInputChange}
              />
              <Spacer y={1} />
              <Text h3>Address</Text>
              <Input
                bordered
                color="primary"
                name="address"
                placeholder="Street Address"
                readOnly={!isEditing}
                value={resource.address}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={12} sm={3} direction="column">
              <Text h3>Categories</Text>
              {/* TODO: Handle input and change here */}
              <Input
                bordered
                color="primary"
                name="category"
                placeholder="Category"
                readOnly={!isEditing}
              />
              <Spacer y={1} />
              <Text h3>Keywords</Text>
              {/* TODO: Handle input and change here */}
              <Input
                bordered
                color="primary"
                name="keywords"
                placeholder="Keyword"
                readOnly={!isEditing}
              />
            </Grid>

            <Card.Divider />

            <Grid xs={12} direction="column">
              <Text h3>Eligibility Criteria</Text>
              <Textarea
                bordered
                color="primary"
                name="eligibilityInfo"
                readOnly={!isEditing}
                placeholder={"Eligibility Criteria"}
                value={resource.eligibilityInfo}
                // onChange={handleInputChange}
              />
            </Grid>
          </Grid.Container>
        </Container>
        <Spacer y={1} />
        <Card.Divider />
        <Spacer y={1} />
        {isEditing && (
          <Container fluid>
            <Row css={{ gap: "22px" }}>
              <Button type="submit">Save Changes</Button>
              <Button
                bordered
                onPress={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </Row>
          </Container>
        )}
      </form>
      <Spacer y={1} />
    </>
  );
};

export default ResourcePageContent;
