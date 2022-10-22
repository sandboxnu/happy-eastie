import { Checkbox } from "@nextui-org/react"
import { FieldInputProps, FormikBag } from "formik"

interface CategoryCheckboxProps {
    field: FieldInputProps<any>
    form: FormikBag<any, any>
    props: any
}

export const CategoryCheckbox = ({ field, form, props} : CategoryCheckboxProps) => {
    console.log(field)
    return <Checkbox {...field} {...props}/>
}