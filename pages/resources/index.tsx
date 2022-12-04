import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useResources } from "../../hooks/useResources";
import { ResourcesDisplay } from "../../components/resources/ResourcesDisplay";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import Loading from "../../components/Loading";

const Resources: NextPage = () => {
  const {requestedResources, additionalResources, isLoading, error} = useResources()

  if (error) return <div>{error.message}</div>
  if (isLoading) return <Loading/>
  if (requestedResources == undefined) return <div>Internal server error: invalid resources loaded</div>
  if (additionalResources == undefined) return <div>Internal server error: invalid resources loaded</div>

  return  (
    <div className={styles.container}>
      <h1>Resources</h1>
      <ResourcesDisplay resources={requestedResources}/>
    </div>
  )
};

export default Resources;
