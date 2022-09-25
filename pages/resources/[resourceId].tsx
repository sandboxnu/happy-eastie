import type { GetStaticPropsContext, NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link';

type ResourceProps = {
  employed: boolean
}

const Resource: NextPage = (props: ResourceProps) => {
    const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Resource {props.employed}</h1>
      <Link href='/results'>Back to Results page</Link>
    </div>
  )
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const resourceData = fetch(`/api/resources/${params!.id}`);
  return {
    props: {
      resourceData,
    },
  };
}

export default Resource
