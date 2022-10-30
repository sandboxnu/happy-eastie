import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { Image } from "@nextui-org/react";

import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
import { ResourceHeader } from "../../components/resources/ResourceHeader";

const ResourcePage: NextPage = () => {
  const router = useRouter();
  const { resourceId } = router.query;
  const { resource, isLoading, error } = useResource(resourceId);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;
  if (!resource) return <div>Internal server error: invalid resource loaded</div>;

  return (
    <div>
      <ResourceHeader resource={resource} />
    </div>
  );
};

export default ResourcePage;
