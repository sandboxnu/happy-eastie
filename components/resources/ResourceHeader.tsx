import { Resource } from "../../models/types";
import { Button, Grid, Image, Text } from "@nextui-org/react";
import Tag from "../tag";
import styles from "./ResourceHeader.module.css";
import { useRouter } from "next/router";
import TagsMap from "../../models/TagsMap";

interface ResourceHeaderProps {
  resource: Resource;
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = (
  props: ResourceHeaderProps
) => {
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
    <>
      <Text className={styles.resourceHeader}>{props.resource.name}</Text>

      <Grid.Container gap={2} justify="center">
        {props.resource.category?.map((c, i) => (
          <Grid key={i}>
            <Tag text={c} color={TagsMap().get(c) ?? "black"} />
          </Grid>
        ))}
      </Grid.Container>

      <Grid.Container gap={2} justify="center">
        <Grid>
          <Button
            auto
            color="primary"
            icon={
              <Image
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
                src="/share.svg"
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
