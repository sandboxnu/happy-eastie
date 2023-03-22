import { Grid, Image } from "@nextui-org/react";

export default function FooterBrand() {
  return (
    <Grid
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "center",
        marginTop: 50,
      }}
      xs={0}
      sm={12}
      md={4}
    >
      <Image src="/HappyEastieWhite.svg" alt="HappyEastie" width={300} />
    </Grid>
  );
}
