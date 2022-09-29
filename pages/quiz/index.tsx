import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Accessibility, Citizenship, EmploymentStatus, Family, Insurance, SurveyAnswers } from '../../models/types'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";


const Quiz: NextPage = () => {
  const validationSchema = Yup.object({
    income: Yup.number().positive(),
    language: Yup.string(),
    citizenship: Yup.string(),
    parentAge: Yup.number().positive().integer(),
    childAge: Yup.number().positive().integer(),
    family: Yup.string(),
    employmentStatus: Yup.number().min(1).max(10).required(),
    insuranace: Yup.date().default(() => new Date()),
    accessibility: Yup.boolean().default(false),
  });

  const initialValues = {
    income: "",
    language: "",
    citizenship: "",
    parentAge: "",
    childAge: "",
    family: new Date(),
    employmentStatus: false,
    insurance: "",
    accessibility: ""
  };

  const onSubmit = (values:any) => {
    alert(JSON.stringify(values, null, 2));
  };

  // const productOptions = products.map((product, key) => (
  //   <option value={product} key={key}>
  //     {product}
  //   </option>
  // ));

  const renderError = (message: string) => <p className="help is-danger">{message}</p>;

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>

      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        // resetForm();
      }}>

      {/* <form> */}
        <span className={styles.form}>
        <label>Estimated Annual Income</label>
        <Field type="text" name="income" defaultValue="$"/>
        <ErrorMessage name="income" render={renderError} />
        
        <label>Language</label>
        <Field as='select' name="languages" id="languages">
          <option>English</option>
          <option>Spanish</option>
        </Field>

        <label>Citizenship</label>
        <Field as='select' name="citizenship" id="citizenship">
          <option></option> 
          { 
          Object.keys(Citizenship)
                .filter((elt: any) => !isNaN(Number(Citizenship[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </Field>

        <label>Parent Age</label>
        <Field name="parentAge"/>

        <label>Child Age</label>
        <Field name="childAge"/>

        <label>Family Type</label>
        <Field as='select' name="family" id="family">
          <option></option> 
          { 
          Object.keys(Family)
                .filter((elt: any) => !isNaN(Number(Family[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </Field>

        <label>Employment Status</label>
        <Field as='select' name="work" id="work">
          <option></option> 
          { 
          Object.keys(EmploymentStatus)
                .filter((elt: any) => !isNaN(Number(EmploymentStatus[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </Field>

        <label>Insurance Type</label>
        <Field as='select' name="insurance" id="insurance">
          <option></option> 
          { 
          Object.keys(Insurance)
                .filter((elt: any) => !isNaN(Number(Insurance[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </Field>

        <label>Accesibility Needs</label>
        <Field as='select' name="accessibility" id="accessibility">
          <option></option> 
          { 
          Object.keys(Accessibility)
                .filter((elt: any) => !isNaN(Number(Accessibility[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </Field>

        <button type="submit" onClick={onSubmit}>Submit</button>
        </span>
      {/* </form> */}

    </Formik>
    </div>
    
  )
}

export default Quiz
