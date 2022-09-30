import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { Resource } from "../../models/types";

type ResourcePropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Resources: NextPage<ResourcePropsType> = ({ resources }: ResourcePropsType) => {
  return (
    <div className={styles.container}>
      <h1>List of Resources Page</h1>
      {resources.map((resource) => <div key={resource.id}><Link href={`/resources/${resource.id}`}>{resource.name}</Link> <br/></div>)}
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const result = await fetch(`http://localhost:3000/api/resources?ids=${context.query?.ids}`)
  const resources : Resource[] = await result.json();
  return { props: { resources } };
};

export default Resources;
