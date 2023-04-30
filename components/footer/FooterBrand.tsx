import { Grid, Image } from "@nextui-org/react";
import styles from "./Footer.module.css"

export default function FooterBrand() {
  return (
    <Grid
      className={styles.footerBrand}
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "center",
        marginTop: 50,        
      }}
      sm={12}
      md={4}
    >
      <Image src="/HappyEastieWhite.svg" alt="HappyEastie" width={300} />
    </Grid>
  );
}


