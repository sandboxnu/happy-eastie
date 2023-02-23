import { NextPage } from "next";
import { ResourceRow } from "../../components/admin/dashboard/resourceRow";

const AdminDashboard: NextPage = () => {
    return (<div>
    
    <ResourceRow name={"Resource 1"} summary={"This is a description of resource 1 bla bla bla."} categories={["Childcare", "Healthcare", "Financial Assistant"]} resourceId={"1"} />
    <ResourceRow name={"Resource 2"} summary={"This is a description of resource 2 bla bla bla."} categories={["Healthcare", "Financial Help"]} resourceId={"2"}/></div>)
}

export default AdminDashboard