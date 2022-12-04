import type { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import homeStyles from '../../styles/Home.module.css'
import resourceStyles from "../../styles/resource.module.css"
import { Resource, ResourceCategory, ResourceSortingMethod } from '../../models/types'
import { useResources } from '../../hooks/useResources'
import { ResourcesDisplay } from '../../components/directory/ResourcesDisplay'
import { FormElement, Row, Spacer, Image, Text, Grid, Link } from '@nextui-org/react'
import { useRouter } from "next/router"
import { ResourcesResponse } from '../api/resources'
import { ResourceSearchBar } from '../../components/resources/ResourceSearchBar'
import { WithId } from 'mongodb';
import Header from '../../components/header'
import Loading from '../../components/Loading'

const ResourceDirectory: NextPage = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("Search resources...")
    const [viewingAll, setViewingAll] = useState<boolean>(false)
    const [filters, setFilters] = useState<string>("")
    const [sortingMethod, setSortingMethod] = useState<ResourceSortingMethod>(ResourceSortingMethod.Alphabetical)
    const [displayResources, setDisplayResources] = useState<WithId<Resource>[]>([])
    const { requestedResources, additionalResources, isLoading, error } = useResources()

    useEffect(() => {
        setDisplayResources(requestedResources)
    }, [requestedResources])

    // TODO: in this useEffect, apply the filters and sorting method selected - probably should delegate
    // the filtering and sorting to the API
    useEffect(() => {
        // TODO: probably want to change this so you don't have to check if search query is the placeholder
        // TODO: Add filters and sorting method to this request
        const requestBody = (searchQuery && !viewingAll && searchQuery !== "Search resources...") ? JSON.stringify({ searchParam: searchQuery }) : null
        const requestSettings = { method: 'POST', body: requestBody, headers: { 'Content-Type': 'application/json' } }
        makeResourcesRequest(requestSettings).then((data) => {
            const resources: WithId<Resource>[] = data.requested;
            setDisplayResources(resources);
        }) //TODO: This currently returns a stray promise. We should probably add some indication of loading and blocking other search requests.
    }, [searchQuery, viewingAll])

    async function makeResourcesRequest(requestSettings: any) {
        const response: Response = await fetch('/api/resources', requestSettings)
        const responseJson: ResourcesResponse = await response.json()
        return responseJson.data;
    }

    if (error) return <div>{error.message}</div>
    if (isLoading) return <Loading/>
    if (!requestedResources) return <div>Internal server error: could not load requested resources</div>
    if (!additionalResources) return <div>Internal server error: could not load additional resources</div>

    const updateSearchQuery = (e: ChangeEvent<FormElement>) => {
        setSearchQuery(e.target.value)
    }

    const toggleViewingAll = () => {
        setViewingAll(!viewingAll);
    }

    return (
        <div className={homeStyles.container}>
            <Header />
            <Grid.Container justify="center">
                <Grid>
                    <Row align="center">
                        <Image src={"/star.svg"} alt="" width={31} height={31} />
                        <Spacer x={0.4} />
                        <Text h1>Resource Directory</Text>
                    </Row>
                </Grid>
            </Grid.Container>
            <Spacer y={1.25} />
            <ResourceSearchBar
                placeholder={searchQuery}
                onChange={updateSearchQuery}
                viewingAll={viewingAll}
                toggleViewingAll={toggleViewingAll}
                setFilters={setFilters}
                setSortingMethod={setSortingMethod}
            />
            <Spacer y={2} />
            <ResourcesDisplay resources={displayResources} />
            <Spacer y={1} />
            <button className={resourceStyles.back} onClick={() => router.back()}>
                Back
            </button>
            <Spacer y={2} />
        </div>
    )
}

export default ResourceDirectory
