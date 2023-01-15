import { Tooltip, Image, Text } from "@nextui-org/react"
import styles from "./HelpTooltip.module.css"

type HelpProps = {
    grayscale?: boolean,
    diameter: number,
    text: string,
};

export const HelpTooltip = (props: HelpProps) => {
    let css = {}
    if (props.grayscale) css = {filter: "grayscale(1)"}

    return (
        <Tooltip placement="leftStart" content={<Text className={styles.tooltipText}>{props.text}</Text>} color="primary">
            <Image src="/help.svg" width={props.diameter} height={props.diameter} alt="Help" css={css} autoResize />
        </Tooltip>
    )
}