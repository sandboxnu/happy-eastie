import { Button, Grid, Link, Row, Spacer } from "@nextui-org/react";
import { WithId } from "mongodb";
import { useState } from "react";
import { AdminDashboardHeader } from "../../components/admin/dashboard/adminDashboardHeader";
import { AdminDashboardSearch } from "../../components/admin/dashboard/adminDashboardSearch";
import { ResourceRow } from "../../components/admin/dashboard/resourceRow";
import { Resource } from "../../models/types2";

type AdminDashboardProps = {
  resources: WithId<Resource>[];
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/admin`
  );
  const resources: WithId<Resource>[] = await res.json();
  return {
    props: {
      resources,
    },
  };
}



function AdminDashboard({ resources }: AdminDashboardProps) {
  const [resourcesDisplayed, setResourcesDisplayed] = useState<WithId<Resource>[]>(resources)



  return (
    <div>
      <AdminDashboardHeader />
      <div style={{ margin: 74 }}>
        <Row css={{ gap: 22, maxWidth: "70%" }}>
          <AdminDashboardSearch setResourcesDisplayed={setResourcesDisplayed} />
        </Row>
        <Spacer y={2} />
        <Row justify="flex-start" css={{ gap: 10 }}>
          <Button as={Link} href="/admin/addNew" css={{ px: 20 }} auto>
            + Add New
          </Button>
          <Button
            css={{ p: 7 }}
            auto
            icon={<img src="/gridLayout.svg"></img>}
          ></Button>
          <Button
            css={{ p: 7 }}
            auto
            icon={<img src="/listLayout.svg"></img>}
          ></Button>
        </Row>

        <Spacer y={1} />
        <Grid.Container>
          {resourcesDisplayed.map((r) => (
            <ResourceRow key={r.name} resourceData={r} />
          ))}
        </Grid.Container>
      </div>
    </div>
  );
}

export default AdminDashboard;
