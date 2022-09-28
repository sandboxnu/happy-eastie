import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { Resource } from '../../models/types'

const CryptoJS = require("crypto-js");

type ResourcePropsType = InferGetServerSidePropsType<typeof getServerSideProps>

const Resources: NextPage<ResourcePropsType> = ({ resources }: ResourcePropsType) => {
  return (
    <div className={styles.container}>
      <h1>List of Resources Page</h1>
      <Link href='/'>Back to Home</Link>
      <h1>{resources.map(resource => (resource.name))}</h1>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let resourcesList = context.query.id as string;
  console.log("RESOURCES LIST", resourcesList);
  const decryptedResources = CryptoJS.AES.decrypt(resourcesList, "Secret Passphrase").toString();
  console.log("DECRYPTED RESOURCES LIST", decryptedResources);
  const resources = JSON.parse(decryptedResources) as Resource[]

  return { props: { resources } }

  // const res : Response = await fetch(`http://localhost:3000/api/resources${context.params?.resourceId}`)
  // const resource: Resource = await res.json()
  // return {props: {resource}}
}

export default Resources
