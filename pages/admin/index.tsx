import { Button, FormElement, Grid, Link, Row, Spacer } from "@nextui-org/react";
import { WithId } from "mongodb";
import { relative } from "path";
import { ChangeEvent, useEffect, useState } from "react";
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
  resources.sort((r1, r2) => r1.name.localeCompare(r2.name))
  return {
    props: {
      resources,
    },
  };
}

function AdminDashboard({ resources }: AdminDashboardProps) {
  const [resourcesDisplayed, setResourcesDisplayed] = useState<WithId<Resource>[]>(resources)
  const [searchQuery, setSearchQuery] = useState<string>("")
  // list layout == true, grid layout == false
  const [listLayout, setListLayout] = useState<Boolean>(true)

  useEffect(() => {
    if (searchQuery === "")
      return setResourcesDisplayed(resources);
    const searchQueryAppliedResources = resources.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
     setResourcesDisplayed(searchQueryAppliedResources);
  }, [searchQuery, resources]);

  return (
    <div>
      <AdminDashboardHeader />
      <div style={{ margin: 74}}>
        <Row css={{ gap: 22, maxWidth: "70%" }}>
          <AdminDashboardSearch onChange={(e: ChangeEvent<FormElement>) => setSearchQuery(e.target.value)} />
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
            onPress={() => setListLayout(false)}
          ></Button>
          <Button
            css={{ p: 7 }}
            auto
            icon={<img src="/listLayout.svg"></img>}
            onPress={() => setListLayout(true)}
          ></Button>
        </Row>

        <Spacer y={1} />
        <Grid.Container justify="flex-start" css={{position: "relative"}}>
          {resourcesDisplayed.map((r) => (
            <ResourceRow key={r.name} resourceData={r} listLayout={listLayout} />
          ))}
        </Grid.Container>
      </div>
    </div>
  );
}

export default AdminDashboard;
