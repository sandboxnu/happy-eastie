import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { Resource } from '../../models/types';

type ResourcePropsType = InferGetServerSidePropsType<typeof getServerSideProps>

const ResourcePage : NextPage<ResourcePropsType> = ({resource} : ResourcePropsType) => {
  if (resource.error) {
    return <div><h1>Resource Not Found</h1><Link href='/results'>Back to Results page</Link></div>
  }
  return (
    <div className={styles.container}>
      <h1>Resource {resource.name}</h1>
      <h2>{resource.description}</h2>
      <Link href='/results'>Back to Results page</Link>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const res : Response = await fetch(`http://localhost:3000/api/resources/${context.params?.resourceId}`)
  const resource: Resource = await res.json()
  return {props: {resource}}
}

export default ResourcePage