import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "./directory.module.css"
import { Resource } from "../models/types";
import { useResources } from "../hooks/useResources";
import { ResourcesDisplay } from "../components/directory/ResourcesDisplay";
import { FilterSidebar } from "../components/directory/sidebar/FilterSidebar";
import {
  Row,
  Spacer,
  Image,
  Text,
  Grid,
  Button,
  Modal,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { WithId } from "mongodb";
import Layout from "../components/Layout";
import Loading from "../components/Loading";

const ResourceDirectoryContent: NextPage = () => {
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
      <Loading/>
    );
  if (!requestedResources)
    return <div>Internal server error: could not load requested resources</div>;
  if (!additionalResources)
    return (
      <div>Internal server error: could not load additional resources</div>
    );

  return (
    <>
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
            <Button bordered onClick={() => setTimeout(() => setBottomSheetVisible(true), 10)}>
              Filters
            </Button>
          </Grid>
          <ResourcesDisplay resources={displayResources} />
        </Grid>
      </Grid.Container>

      <Spacer y={1} />
      <button className={styles.back} onClick={() => router.back()}>
        Back
      </button>
      <Spacer y={2} />

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={bottomSheetVisible}
        scroll
        onClose={bottomSheetCloseHandler}
        css={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <Modal.Header>
          <Text b size={24}>
            Filter Resources
          </Text>
        </Modal.Header>
        <Modal.Body css={{ p: 0 }}>
          <FilterSidebar setResources={setDisplayResources} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

const ResourceDirectory = () => {
  return <Layout includePadding={false}>
    <ResourceDirectoryContent/>
  </Layout>
}
export default ResourceDirectory;
