import { Grid, Row, Spacer, Text, Image } from "@nextui-org/react";
import NextLink from "next/link"
import styles from "./Home.module.css"

type TableLinkProps = {
    name: string;
  };

const TableLink = (props: TableLinkProps) => (
    <td>
      <NextLink href="/directory" style={{color: "black"}}>
        {props.name}
      </NextLink>
    </td>
  );

export default function DirectorySection() {
  
    return (
      <Grid.Container justify="center">
        <Row align="baseline">
          <Image src="star.svg" alt="" containerCss={{ margin: 0 }} />
          <Spacer x={0.8} />
          <NextLink href="/directory"><Text h1>Resource Directory</Text></NextLink>
        </Row>
        <Row>{/* Add the search bar and buttons here */}</Row>
        <Row justify="center">
          <table className={styles.tableContent} style={{}}>
            <tbody>
              <tr>
                <TableLink name="Early Childhood" />
                <TableLink name="Cash Assistance" />
              </tr>
              <tr>
                <TableLink name="Healthcare" />
                <TableLink name="Housing" />
              </tr>
              <tr>
                <TableLink name="Food" />
                <TableLink name="Young Parents" />
              </tr>
            </tbody>
          </table>
        </Row>
        <Spacer />
      </Grid.Container>
    );
  }