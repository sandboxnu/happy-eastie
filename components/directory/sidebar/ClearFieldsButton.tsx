import { Button } from "@nextui-org/react"
import styles from "./ClearFieldsButton.module.css"
interface ClearFieldsButtonProps<T>{
    setField: (clearedValue: T) => void;
    clearedValue: T;
}
export default function ClearFieldsButton<T>({setField, clearedValue} : ClearFieldsButtonProps<T>) {
    return (<Button bordered onClick={() => setField(clearedValue)} className={styles.button}>
    Clear Fields
  </Button>)
}