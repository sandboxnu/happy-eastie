import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { ResourceCategory } from '../../models/types'
import { useResources } from '../../hooks/useResources'
import { ResourcesDisplay } from '../../components/directory/ResourcesDisplay'

const Directory: NextPage = () => {
    const { requestedResources, additionalResources, isLoading, error } = useResources()

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>loading...</div>
    if (!requestedResources) return <div>Internal server error: could not load requested resources</div>
    if (!additionalResources) return <div>Internal server error: could not load additional resources</div>

    return (
        <div className={styles.container}>
            <h1>Resource Directory</h1>
            <Link href='/'>Back to Home</Link>
            <br />
            <br />

            <div>
                {Object.values(ResourceCategory).map(c =>
                    <label key={c}>
                        <input
                            type="checkbox"
                            name="category"
                            value={c}
                        /> {c}
                        <br />
                    </label>
                )}
            </div>
            <br />
            <ResourcesDisplay resources={requestedResources} />
            <br />
            {/* TODO: Currently just goes back to home page */}
            <Link href='/'>Log Out</Link>
            <br />
            <br />
        </div>
    )
}

export default Directory
