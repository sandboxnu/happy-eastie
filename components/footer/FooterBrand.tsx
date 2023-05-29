import { Grid, Image } from "@nextui-org/react";

export default function FooterBrand() {
  return (
    <Grid
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
      }}
      xs={12}
      sm={12}
      md={4}
    >
      <Image src="/HappyEastieWhite.svg" alt="HappyEastie" width={300} />
    </Grid>
  );
}
