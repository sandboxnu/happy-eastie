import DirectorySection from '../components/home/DirectorySection'
import InfoSection from '../components/home/InfoSection'
import TrendingSection from '../components/home/TrendingSection'
import Layout from '../components/Layout'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const HomePage = () => {
    return (<Layout>
        <InfoSection/>
        <TrendingSection/>
        <DirectorySection/>
    </Layout>)
}

export default HomePage