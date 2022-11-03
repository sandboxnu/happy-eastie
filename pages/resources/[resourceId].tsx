import type { NextPage } from "next";
import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
import { ResourceHeader } from "../../components/resources/ResourceHeader";
import ReactMarkdown from "react-markdown";
import { ResourceDescription } from "../../components/resources/ResourceDescription";

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
    <Grid.Container direction="column" justify="center" wrap="nowrap">
      <ResourceHeader resource={resource} />
      <ResourceDescription resource={resource} />

      <Grid.Container justify="center">
        <Grid direction="column" css={{maxWidth: 440}}>
          <Text h3 css={{textAlign: "center"}}>How to Apply</Text>
          {howToApply && <ReactMarkdown children={howToApply} />}
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export default ResourcePage;
