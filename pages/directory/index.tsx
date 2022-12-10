import type { NextPage } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import resourceStyles from "../../styles/resource.module.css";
import {
  Resource,
  ResourceCategory,
  ResourceSortingMethod,
} from "../../models/types";
import { useResources } from "../../hooks/useResources";
import { ResourcesDisplay } from "../../components/directory/ResourcesDisplay";
import { FilterSidebar } from "../../components/directory/sidebar/FilterSidebar";
import {
  FormElement,
  Row,
  Spacer,
  Image,
  Text,
  Grid,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { ResourcesResponse } from "../api/resources";
import { ResourceSearchBar } from "../../components/resources/ResourceSearchBar";
import { WithId } from "mongodb";
import Header from "../../components/header";

const ResourceDirectory: NextPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("Search Resources");
  const [displayResources, setDisplayResources] = useState<WithId<Resource>[]>(
    []
  );
  const { requestedResources, additionalResources, isLoading, error } = useResources();

  // TODO: in this useEffect, apply the filters and sorting method selected - probably should delegate
  // the filtering and sorting to the API
  useEffect(() => {
    // TODO: Locally filter displayResources
  }, [searchQuery]);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  if (!requestedResources)
    return <div>Internal server error: could not load requested resources</div>;
  if (!additionalResources)
    return (
      <div>Internal server error: could not load additional resources</div>
    );

  const updateSearchQuery = (e: ChangeEvent<FormElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Header />

      <Grid.Container justify="center">
        <Grid>
          <Row align="center">
            <Image src={"/star.svg"} alt="" width={31} height={31} />
            <Spacer x={0.4} />
            <Text h1>Resource Directory</Text>
          </Row>
        </Grid>
      </Grid.Container>

      <Grid.Container>
        <Grid md={3} direction="column" justify="center" css={{ padding: "00px" }}>
          <ResourceSearchBar
            placeholder={searchQuery}
            onChange={updateSearchQuery}
          />
          <FilterSidebar setResources={setDisplayResources} />
        </Grid>

        <Grid md={9} direction="column">
          <Spacer y={4} />
          <ResourcesDisplay resources={displayResources} />
        </Grid>

      </Grid.Container>

      <Spacer y={1} />
      <button className={resourceStyles.back} onClick={() => router.back()}>
        Back
      </button>
      <Spacer y={2} />
    </div >
  )
};

export default ResourceDirectory;
