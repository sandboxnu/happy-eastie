import type { NextPage } from "next";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { NORMAL_IRON_OPTION } from "../../../models/constants";
import {
  Button,
  Card,
  Container,
  FormElement,
  Grid,
  Image,
  Loading,
  Radio,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useResource } from "../../../hooks/useResource";
import { useEffect, useState } from "react";
import { Resource } from "../../../models/types2";
import { WithId } from "mongodb";
import { FormInput } from "../../../components/admin/dashboard/InputField";
import IncomeRangeContainer from "../../../components/admin/dashboard/incomeRangeContainer";
import { TagSelector } from "../../../components/admin/dashboard/tagSelector";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(ctx) {
    const user = ctx.req?.session.user;

    if (!user || user.isAdmin !== true) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user: ctx.req.session.user,
      },
    };
  },
  NORMAL_IRON_OPTION
);


const ResourcePageContent: NextPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const { resourceId } = router.query;
  const { resource, isLoading, error } = useResource(resourceId);
  // This is the resource as it's being edited
  // - Upon saving, this will be applied to the actual resource
  // - Upon cancel, this will be discarded
  const [inputtedResource, setInputtedResource] = useState<WithId<Resource>>();

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
  if (!resource || !inputtedResource)
    return <div>Internal server error: invalid resource loaded</div>;

  const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputtedResource((values) => values && { ...values, [name]: value });
  };

  const handleRadioChange = (value : string, name: string) => {
    setInputtedResource((values) => values && { ...values, [name]: value === "true"});
  }

  const saveResource = async (event: React.FormEvent) => {
    event.preventDefault();
    updateResource(inputtedResource).then(() => router.reload());
  };

  const updateResource = async (r: WithId<Resource>) => {
    const { _id, ...replacement } = r;
    const requestBody = {
      _id: resourceId,
      replacement: replacement,
    };

    const requestSettings: RequestInit = {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    };
    const response: Response = await fetch("/api/admin/resources", requestSettings);
    const result = await response.json();
    return result.modifiedCount;
  };

  async function getCategories(): Promise<string[]> {
    const response = await fetch("/api/resources/categories");
    const categories = await response.json();

    return categories;
  }

  async function getLanguages(): Promise<string[]> {
    const response = await fetch("/api/resources/languages");
    const languages = await response.json();
    return languages;
  }

  async function getAccessibility(): Promise<string[]> {
    const response = await fetch("/api/resources/accessibility");
    const accessibility = await response.json();
    return accessibility;
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
      <form onSubmit={saveResource}>
        <Container fluid>
          <Grid.Container justify="space-between" css={{ gap: "30px" }}>
            <Grid xs={12}>
              <Row justify="space-between" align="center">
                <FormInput
                  name="name"
                  size="xl"
                  placeholder="Resource Name"
                  editing={isEditing}
                  value={inputtedResource.name}
                  onChange={handleInputChange}
                />
                {!isEditing && (
                  <Button
                    auto
                    iconRight={<img src="/pencilwhite.svg" />}
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
              <FormInput
                name="summary"
                fullWidth
                placeholder="Summary"
                size="md"
                editing={isEditing}
                value={inputtedResource.summary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} direction="column">
              <Text h3>Description</Text>
              <FormInput
                multiLine
                name="description"
                editing={isEditing}
                placeholder="Description"
                value={inputtedResource.description}
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
                <FormInput
                  name="email"
                  placeholder="Email"
                  editing={isEditing}
                  value={inputtedResource.email}
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
                <FormInput
                  name="phone"
                  placeholder="Phone"
                  editing={isEditing}
                  value={inputtedResource.phone}
                  onChange={handleInputChange}
                />
              </Row>
            </Grid>

            <Grid xs={12} sm={3} direction="column">
              <Text h3>Website</Text>
              <FormInput
                name="website"
                placeholder="Website"
                editing={isEditing}
                value={inputtedResource.website}
                onChange={handleInputChange}
              />
              <Spacer y={1} />
              <Text h3>Address</Text>
              <FormInput
                name="address"
                placeholder="Street Address"
                editing={isEditing}
                value={inputtedResource.address}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={12} sm={3} direction="column">
              <Text h3>Categories</Text>
              <TagSelector
                name="category"
                tags={inputtedResource.category}
                editing={isEditing}
                onChange={handleInputChange}
                fetchDatalist={getCategories}
              />
              <Spacer y={1} />
              <Text h3>Keywords</Text>
              <TagSelector
                name="keywords"
                tags={inputtedResource.keywords ?? []}
                colorful={false}
                editing={isEditing}
                onChange={handleInputChange}
              />
            </Grid>

            <Card.Divider />

            <Grid xs={12} sm={3} direction="column">
              <Text h3>Income Range per Household Size</Text>
              <IncomeRangeContainer ranges={inputtedResource.incomeByHouseholdMembers} editing={isEditing} onChange={(mutator) => {
                const r = {...inputtedResource}
                r.incomeByHouseholdMembers = mutator(r.incomeByHouseholdMembers)
                setInputtedResource(r)
              }}/>
            </Grid>

            <Grid xs={12} sm={3} direction="column">
              <Text h3>Eligibility Criteria</Text>
              <FormInput
                multiLine
                name="eligibilityInfo"
                editing={isEditing}
                placeholder={"Eligibility Criteria"}
                value={inputtedResource.eligibilityInfo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} sm={3} direction="column">
              <Text h3>Is Documentation Required?</Text>
              {isEditing ? 
                          <Radio.Group defaultValue={resource.documentationRequired.toString()} onChange={(value) => {
                            handleRadioChange(value, "documentationRequired")
                          }}>
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                          </Radio.Group>
                        : <Text>{resource.documentationRequired ? "Yes" : "No"}</Text>}
            </Grid>
            <Card.Divider />
            <Grid xs={12} sm={3} direction="column" justify="flex-start">
              <Text h3>Accessibility</Text>
              <TagSelector
                name="accessibilityOptions"
                tags={inputtedResource.accessibilityOptions ?? []}
                editing={isEditing}
                colorful={false}
                onChange={handleInputChange}
                fetchDatalist={getAccessibility}
              />
            </Grid>
            <Grid xs={12} sm={3} direction="column" justify="flex-start">
              <Text h3>Languages</Text>
              <TagSelector
                name="availableLanguages"
                tags={inputtedResource.availableLanguages}
                editing={isEditing}
                colorful={false}
                onChange={handleInputChange}
                fetchDatalist={getLanguages}
              />
            </Grid>
            <Grid xs={0} sm={3}></Grid>
          </Grid.Container>
        </Container>
        {isEditing && (
          <>
            {/* Extra space to account for the fixed buttons at the bottom */}
            <Spacer y={6} />
            {/* Fixed buttons at the bottom */}
            <div
              style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "white",
                padding: "40px 5%",
                boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Row css={{ gap: "22px" }}>
                <Button type="submit">Save Changes</Button>
                <Button
                  bordered
                  onPress={() => {
                    // Reset inputted resource to original resource
                    setInputtedResource(resource);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </Row>
            </div>
          </>
        )}
      </form>
      <Spacer y={1} />
    </>
  );
};

export default ResourcePageContent;
