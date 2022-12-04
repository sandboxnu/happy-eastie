import type { NextPage } from "next";
import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
import { ResourceHeader } from "../../components/resources/ResourceHeader";
import ReactMarkdown from "react-markdown";
import { Image, Spacer, Text } from "@nextui-org/react";
import styles from "../../styles/resource.module.css";
import { ResourceDescription } from "../../components/resources/ResourceDescription";
import Header from "../../components/header";

const ResourcePage: NextPage = () => {
  const router = useRouter();
  const { resourceId } = router.query;
  const { resource, isLoading, error } = useResource(resourceId);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  if (!resource)
    return <div>Internal server error: invalid resource loaded</div>;

  const howToApply = resource.howToApply?.replaceAll("\\n", "\n");

  return (
    <>
      <Header />
      <Image
        src={resource.headerImageUrl}
        width="100%"
        height={254}
        objectFit="cover"
        alt="Resource header image"
      />
      <div style={{ margin: "0 40px" }}>
        <ResourceHeader resource={resource} />
        <Spacer y={2} />
        <ResourceDescription resource={resource} />
        <Spacer y={2} />
        <div>
          <Text h3 css={{ textAlign: "center" }}>
            How to Apply
          </Text>
          {howToApply && <ReactMarkdown>{howToApply}</ReactMarkdown>}
        </div>
      </div>

      <button className={styles.back} onClick={() => router.back()}>
        Back
      </button>
    </>
  );
};

export default ResourcePage;
