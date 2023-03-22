import type { NextPage } from "next";
// import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
// import { ResourceHeader } from "../../components/resources/ResourceHeader";
import ReactMarkdown from "react-markdown";
import { Button, Image, Row, Spacer, Text, Textarea } from "@nextui-org/react";
import styles from "./[resourceId].module.css";
import { useResource } from "../../../hooks/useResource";
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
      <>
      <Text h3>Summary</Text>
        <Textarea bordered borderWeight="light" fullWidth color="primary" />
        <Spacer y={1} />
        <Text h3>Description</Text>
        <Textarea bordered borderWeight="light" fullWidth color="primary" />
        <Spacer y={1} />
        <Text h3>Contact</Text>
        <Row>
          <Image src="/email.svg" width="12px" height="9px" css={{backgroundColor: "$primary", py: 8, px: 6}}/>
        </Row>
        <Text h3>Website</Text>
        <Text h3>Address</Text>
        <Text h3>Categories</Text>
        <Text h3>Keywords</Text>
      </>
    );
  };
  
const ResourcePage = () => {
    return <></>
}
export default ResourcePageContent;
  