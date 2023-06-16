import { GetServerSideProps } from 'next'
import InfoSection from '../components/home/InfoSection'
import TrendingSection, { EastieEvent } from '../components/home/TrendingSection'
import Layout from '../components/Layout'
import mongoDbInteractor from '../db/mongoDbInteractor'
import { Resource } from '../models/types'
import { RESOURCE_COLLECTION } from '../models/constants'

const getServerSideProps : GetServerSideProps = async () => {
    try{
        const trendingResources = (await mongoDbInteractor.getDocuments<Resource>(RESOURCE_COLLECTION, {"trendingInfo.isTrending": true})).sort((a,b) => a.trendingInfo!.trendingDate.getTime() >= b.trendingInfo!.trendingDate.getTime()? -1 : 1) //these should have trending info because we filtered on them

        const events : EastieEvent[] = trendingResources.map(r => ({
            name: r.name,
            summary: r.summary,
            imageFilename: r.headerImageUrl ?? "",
            tags: r.category
        }))

        return {
            props: {
                events
            }
        }
    } catch(e) {
        console.error('Could not get trending resources.')

        return {
            props: {

            }
        }
    }
}

const HomePage = ({events}: {events?: EastieEvent[]}) => {
    return (<Layout>
        <InfoSection/>
        <TrendingSection events={events}/>
    </Layout>)
}

export {getServerSideProps}
export default HomePage