import { Grid, Image, Link } from "@nextui-org/react";
import NextLink from "next/link";
import styles from "./Footer.module.css";
import FooterLinks from "./FooterLinks";

//TODO: change to NextJs image
export default function FooterBrand() {
  const items = [
    { title: "Quiz", href: "/quiz" },
    { title: "Resource", href: "/directory" },
    { title: "Community Events", href: "/future" },
    { title: "About Us", href: "/about" },
  ];

  return (
    <Grid
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        paddingLeft: 70,
        mt: 50,
      }}
    >
      <Image src="/HappyEastieWhite.svg" alt="HappyEastie" width={300} />
      <FooterLinks />
    </Grid>
  );
}
