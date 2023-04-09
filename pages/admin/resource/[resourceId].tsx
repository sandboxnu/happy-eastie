import type { NextPage } from "next";
// import { useResource } from "../../hooks/useResource";
import { useRouter } from "next/router";
// import { ResourceHeader } from "../../components/resources/ResourceHeader";
import ReactMarkdown from "react-markdown";
import { Image, Spacer, Text } from "@nextui-org/react";
import styles from "./[resourceId].module.css";
import { withIronSessionSsr } from "iron-session/next";
import { IRON_OPTION } from "../../../models/constants";
// import { ResourceDescription } from "../../components/resources/ResourceDescription";
// import Loading from "../../components/Loading";
// import Layout from "../../components/Layout";

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
  IRON_OPTION
);


const ResourcePageContent: NextPage = () => {
    const router = useRouter();
    const { resourceId } = router.query;
    // const { resource, isLoading, error } = useResource(resourceId);
  
    // if (error) return <div>{error.message}</div>;
    // if (isLoading) return <Loading/>;
    // if (!resource)
    //   return <div>Internal server error: invalid resource loaded</div>;
  
  
    return (
      <>
        {resourceId}
        {/* {resource.headerImageUrl &&
          <Image src={resource.headerImageUrl} width="100%" height={254} objectFit="cover" alt="Resource header image"/>
        }
        <div style={{ margin: "0 40px" }}>
          <ResourceHeader resource={resource} />
          <Spacer y={2} />
          <ResourceDescription resource={resource} />
          <Spacer y={2} />
          <div>
            <Text h3 css={{ textAlign: "center" }}>
              How to Apply
            </Text>
            {resource.eligibilityInfo && <ReactMarkdown>{resource.eligibilityInfo}</ReactMarkdown>}
          </div>
        </div>
  
        <button className={styles.back} onClick={() => router.back()}>
          Back
        </button> */}
      </>
    );
  };
  
const ResourcePage = () => {
    return <></>
}
export default ResourcePageContent;
  