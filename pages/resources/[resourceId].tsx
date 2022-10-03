import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import { Resource } from '../../models/types';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import { useResource } from '../../hooks/useResource';
import { useRouter } from 'next/router';


const ResourcePage: NextPage = () => {
  const quizState = useContext(AppContext)
  const router = useRouter()
  const {resourceId} = router.query
  const {resource, isLoading, isError} = useResource(quizState.encryptedQuizResponse, resourceId as string)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <h1>Resource {resource!.name}</h1>
      <h2>{resource!.description}</h2>
      <Link href='/resources'>Back to Results page</Link>
    </div>
  )
}


export default ResourcePage
