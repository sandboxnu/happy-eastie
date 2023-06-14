import { Resource } from "../../models/types";
import { Button, Grid, Image, Text } from "@nextui-org/react";
import Tag from "../tag";
import styles from "./ResourceHeader.module.css";
import { useRouter } from "next/router";

interface ResourceHeaderProps {
  resource: Resource;
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = (
  props: ResourceHeaderProps
) => {
  const router = useRouter();

  const phoneNumberClicked = () => {
    router.push(`tel:${props.resource.phone}`);
  };

  const emailClicked = () => {
    router.push(`mailto:${props.resource.email}`);
  };

  const shareClicked = () => {
    const url = props.resource.website;
    if (url) {
      router.push(url);
    }
  };

  return (
    <>
      <Text className={styles.resourceHeader}>{props.resource.name}</Text>

      <Grid.Container gap={1} justify="center">
        {props.resource.category?.map((c, i) => (
          <Grid key={i}>
            <Tag text={c} />
          </Grid>
        ))}
      </Grid.Container>

      <Grid.Container gap={4} justify="center">
        <Grid>
          <Button
            auto
            color="primary"
            icon={
              <Image
                width="26px"
                src="/phonewhite.svg"
                objectFit="fill"
                alt="Call the organization"
              />
            }
            rounded={true}
            className={styles.button}
            onClick={phoneNumberClicked}
          ></Button>
        </Grid>

        <Grid>
          <Button
            auto
            color="primary"
            icon={
              <Image
                width="26px"
                src="/email.svg"
                objectFit="fill"
                alt="Email the organization"
              />
            }
            rounded={true}
            className={styles.button}
            onClick={emailClicked}
          ></Button>
        </Grid>

        <Grid>
          <Button
            auto
            color="primary"
            icon={
              <Image
                width="29px"
                src="/website.svg"
                objectFit="fill"
                alt="Share the organization"
              />
            }
            rounded={true}
            className={styles.button}
            onClick={shareClicked}
          ></Button>
        </Grid>
      </Grid.Container>
    </>
  );
};
