import {
  Button,
  Container,
  FormElement,
  Grid,
  Link,
  Row,
  Spacer,
  Image
} from "@nextui-org/react";
import { WithId } from "mongodb";
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
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin`
  );
  const resources: WithId<Resource>[] = await res.json();
  resources.sort((r1, r2) => r1.name.localeCompare(r2.name));
  return {
    props: {
      resources,
    },
  };
}

function AdminDashboard({ resources }: AdminDashboardProps) {
  const [resourcesDisplayed, setResourcesDisplayed] =
    useState<WithId<Resource>[]>(resources);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // list layout == true, grid layout == false
  const [listLayout, setListLayout] = useState<Boolean>(true);

  useEffect(() => {
    if (searchQuery === "") return setResourcesDisplayed(resources);
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
      <Container fluid>
        <Row css={{ gap: 22, maxWidth: "70vw", mt: 63 }}>
          <AdminDashboardSearch
            onChange={(e: ChangeEvent<FormElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </Row>
        <Spacer y={2} />
        <Row css={{ gap: 10 }}>
          <Button
            as={Link}
            href="/admin/addNew"
            css={{ px: 20 }}
            size="lg"
            auto
            icon={<Image src="/plus.svg" />}
          >
            Add New
          </Button>

          <Button
            aria-label="Grid Layout"
            css={{ p: 10, bgColor: listLayout ? "$gray600" : "primary" }}
            auto
            size="lg"
            onPress={() => setListLayout(false)}
          >
            <Image src="/gridLayout.svg" width={26} />
          </Button>

          <Button
            aria-label="List Layout"
            css={{ p: 10, bgColor: listLayout ? "primary" : "$gray600" }}
            auto
            size="lg"
            onPress={() => setListLayout(true)}
          >
            <Image src="/listLayout.svg" width={26} />
          </Button>
        </Row>

        <Spacer y={1} />
        <Grid.Container gap={listLayout ? 0 : 2} css={{ px: 0 }}>
          {resourcesDisplayed.map((r) => (
            <ResourceRow
              key={`${r._id}`}
              resourceData={r}
              listLayout={listLayout}
            />
          ))}
        </Grid.Container>
      </Container>
    </div>
  );
}

export default AdminDashboard;
