import { Resource } from "../../models/types";
import { Button, Grid, Image } from "@nextui-org/react";
import Tag from "../tag";
import styles from "../../styles/resource.module.css";
import { useRouter } from "next/router";

interface ResourceHeaderProps {
  resource: Resource;
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = (props: ResourceHeaderProps) => {
  const router = useRouter();

  const phoneNumberClicked = () => {
    router.push(`tel:${props.resource.phoneNumber}`);
  };

  const emailClicked = () => {
    router.push(`mailto:${props.resource.email}`);
  };

  const shareClicked = () => {
    const url = props.resource.url;
    if (url) {
      router.push(url);
    }
  };

  return (
    <div>
      <Image src={props.resource.headerImageUrl} objectFit="cover" alt="Resource header image" />

      <Grid.Container justify="center" gap={1}>
        {props.resource.category?.map((c, i) => (
          <Grid key={i} md={1}>
            <Tag text={c} color="green" />
          </Grid>
        ))}
      </Grid.Container>

      <Grid.Container justify="center" gap={4}>
        <Grid>
          <Button
            auto
            color="primary"
            icon={<Image src="/phonewhite.svg" objectFit="fill" alt="Call the organization" />}
            rounded={true}
            className={styles.button}
            onClick={phoneNumberClicked}
          ></Button>
        </Grid>
        <Grid>
          <Button
            auto
            color="primary"
            icon={<Image src="/email.svg" objectFit="fill" alt="Email the organization" />}
            rounded={true}
            className={styles.button}
            onClick={emailClicked}
          ></Button>
        </Grid>
        <Grid>
          <Button
            auto
            color="primary"
            icon={<Image src="/share.svg" objectFit="fill" alt="Share the organization" />}
            rounded={true}
            className={styles.button}
            onClick={shareClicked}
          ></Button>
        </Grid>
      </Grid.Container>
    </div>
  );
};
