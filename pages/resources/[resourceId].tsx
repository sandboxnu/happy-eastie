import type { GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Resource } from '../../models/types';

const ResourcePage: NextPage<Resource> = (resource: Resource) => {
    const router = useRouter();
    console.log(resource)

  return (
    <div className={styles.container}>
      <h1>Resource {resource.description}</h1>
      <Link href='/results'>Back to Results page</Link>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log(context.params?.resourceId)
  const url = `http://localhost:3000/api/resources/${context.params?.resourceId}`
  const res = await fetch(url)
  console.log(res)
  const resource: Resource = await res.json()

  return resource
}

export default ResourcePage
