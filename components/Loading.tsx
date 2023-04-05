import { Loading as NextUILoading } from "@nextui-org/react";
import styles from "./Loading.module.css"
const Loading = ({relative}: {relative?: boolean}) => {


  return (<NextUILoading
    size="xl"
    css={relative? {} : {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
    >
    Loading...
    </NextUILoading>)
}
export default Loading