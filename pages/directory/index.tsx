import type { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import homeStyles from '../../styles/Home.module.css'
import resourceStyles from "../../styles/resource.module.css"
import { Resource, ResourceCategory, ResourceSortingMethod } from '../../models/types'
import { useResources } from '../../hooks/useResources'
import { ResourcesDisplay } from '../../components/directory/ResourcesDisplay'
import { FormElement, Row, Spacer, Image, Text, Grid, Link } from '@nextui-org/react'
import { useRouter } from "next/router"
import { ResourcesResponse } from '../api/resources'
import { ResourceSearchBar } from '../../components/resources/ResourceSearchBar'
import { WithId } from 'mongodb'
import Header from '../../components/header'
import Loading from '../../components/Loading'
import Footer from '../../components/footer'

const ResourceDirectory: NextPage = () => {
  const router = useRouter();
  const [displayResources, setDisplayResources] = useState<WithId<Resource>[]>(
    []
  );
  const { requestedResources, additionalResources, isLoading, error } =
    useResources();

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetCloseHandler = () => {
    setBottomSheetVisible(false);
  };

  if (error) return <div>{error.message}</div>;
  if (isLoading)
    return (
      <Loading
        size="xl"
        css={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Loading Resources
      </Loading>
    );
  if (!requestedResources)
    return <div>Internal server error: could not load requested resources</div>;
  if (!additionalResources)
    return (
      <div>Internal server error: could not load additional resources</div>
    );

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
        <Grid xs={0} sm={3} direction="column">
          <FilterSidebar setResources={setDisplayResources} />
        </Grid>

        <Grid xs={12} sm={9} direction="column" alignItems="center">
          <Grid xs={5} sm={0}>
            <Button bordered onClick={() => setBottomSheetVisible(true)}>
              Filters
            </Button>
          </Grid>
          <ResourcesDisplay resources={displayResources} />
        </Grid>
      </Grid.Container>
    return (
        <div>
            <Header />
            <div className={homeStyles.container}>
                <Grid.Container justify="center">
                    <Grid>
                        <Row align="center">
                            <Image src={"/star.svg"} alt="" width={31} height={31} />
                            <Spacer x={0.4} />
                            <Text h1>Resource Directory</Text>
                        </Row>
                    </Grid>
                </Grid.Container>
                <Spacer y={1.25} />
                <ResourceSearchBar
                    placeholder={searchQuery}
                    onChange={updateSearchQuery}
                    viewingAll={viewingAll}
                    toggleViewingAll={toggleViewingAll}
                    setFilters={setFilters}
                    setSortingMethod={setSortingMethod}
                />
                <Spacer y={2} />
                <ResourcesDisplay resources={displayResources} />
                <Spacer y={1} />
                <button className={resourceStyles.back} onClick={() => router.back()}>
                    Back
                </button>
                <Spacer y={2} />
            </div>
            <Footer/>
        </div>
    )
}

export default ResourceDirectory;
