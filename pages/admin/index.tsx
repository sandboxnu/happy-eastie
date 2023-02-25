import { WithId } from "mongodb";
import { NextPage } from "next";
import { ResourceRow } from "../../components/admin/dashboard/resourceRow";
import { Resource } from "../../models/types2";

type AdminDashboardProps = {
    resources: WithId<Resource>[]
}

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/admin")
    const resources : WithId<Resource>[] = await res.json()
    return {
        props: {
            resources
        }
    }
}

function AdminDashboard({resources} : AdminDashboardProps) {
  
  return (
    <div>
      {resources.map((r) => (
        <ResourceRow key={r.name} resourceData={r} />
      ))}
    </div>
  );
};

export default AdminDashboard;
