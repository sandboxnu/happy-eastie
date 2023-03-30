import type { NextPage } from "next";
import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
import { ResourceHeader } from "../../components/resources/ResourceHeader";
import ReactMarkdown from "react-markdown";
import { Image, Spacer, Text } from "@nextui-org/react";
import styles from "./[resourceId].module.css";
import { ResourceDescription } from "../../components/resources/ResourceDescription";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

const ResourcePageContent: NextPage = () => {
  const router = useRouter();
  const { resourceId } = router.query;
  const { resource, isLoading, error } = useResource(resourceId);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  if (!resource)
    return <div>Internal server error: invalid resource loaded</div>;


  return (
    <>
    <button className={styles.back} onClick={() => router.back()}>
        {"< Back"} 
      </button>
      <Image src={resource.headerImageUrl || "https://thumbs.dreamstime.com/b/tobin-bridge-zakim-bridge-boston-skyline-panorama-sunset-77994808.jpg"}
        width="100%" height={300} objectFit="cover" alt="Resource header image" />

      <div style={{ margin: "0 40px" }}>
        <ResourceHeader resource={resource} />
        <Spacer y={2} />
        <ResourceDescription resource={resource} />
      </div>
    </>
  );
};

const ResourcePage = () => {
  return <Layout includePadding={false}>
    <ResourcePageContent />
  </Layout>
}
export default ResourcePage;
