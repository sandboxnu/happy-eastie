import type { NextPage } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Resource, ResourceCategory, ResourceSortingMethod } from '../../models/types'
import { useResources } from '../../hooks/useResources'
import { ResourcesDisplay } from '../../components/directory/ResourcesDisplay'
import { FormElement } from '@nextui-org/react';
import { ResourcesResponse } from '../api/resources'
import { ResourceSearchBar } from '../../components/resources/ResourceSearchBar'
import Header from '../../components/header'
const ResourceDirectory: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>("Search resources...")
    const [viewingAll, setViewingAll] = useState<boolean>(false)
    const [filters, setFilters] = useState<ResourceCategory[]>([])
    const [sortingMethod, setSortingMethod] = useState<ResourceSortingMethod>(ResourceSortingMethod.Alphabetical)
    const [displayResources, setDisplayResources] = useState<Resource[]>([])
    const { requestedResources, additionalResources, isLoading, error } = useResources()

    useEffect(() => {
        setDisplayResources(requestedResources as Resource[])
    }, [requestedResources])

    // TODO: in this useEffect, apply the filters and sorting method selected - probably should delegate
    // the filtering and sorting to the API
    useEffect(() => {
        // TODO: probably want to change this so you don't have to check if search query is the placeholder
        // TODO: Add filters and sorting method to this request
        const requestBody = (searchQuery && !viewingAll && searchQuery !== "Search resources...") ? JSON.stringify({ searchParam: searchQuery }) : null
        const requestSettings = { method: 'POST', body: requestBody, headers: { 'Content-Type': 'application/json' } }
        makeResourcesRequest(requestSettings).then((data) => {
            const resources: Resource[] = data.requested;
            setDisplayResources(resources);
        }) //TODO: This currently returns a stray promise. We should probably add some indication of loading and blocking other search requests.
    }, [searchQuery, viewingAll])

    async function makeResourcesRequest(requestSettings: any) {
        const response: Response = await fetch('/api/resources', requestSettings)
        const responseJson: ResourcesResponse = await response.json()
        return responseJson.data;
    }

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>loading...</div>
    if (!requestedResources) return <div>Internal server error: could not load requested resources</div>
    if (!additionalResources) return <div>Internal server error: could not load additional resources</div>

    const updateSearchQuery = (e: ChangeEvent<FormElement>) => {
        setSearchQuery(e.target.value)
    }

    const toggleViewingAll = () => {
        setViewingAll(!viewingAll);
    }

    return (
        <div className={styles.container}>
            <Header />
            <h1 style={{ textAlign: "center" }}>Resource Directory</h1>
            <br />
            <br />

            <ResourceSearchBar
                placeholder={searchQuery}
                onChange={updateSearchQuery}
                viewingAll={viewingAll}
                toggleViewingAll={toggleViewingAll}
                setFilters={setFilters}
                setSortingMethod={setSortingMethod}
            />

            <br />
            <br />

            <ResourcesDisplay resources={displayResources} />

            <br />

            <Link href='/'>Back</Link>

            <br />
            <br />
        </div>
    )
}

export default ResourceDirectory
