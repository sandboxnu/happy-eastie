import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Accessibility, Citizenship, EmploymentStatus, Family, Insurance } from '../../models/types'
import * as Yup from 'yup'

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

  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>

      <form action="/results" method="post">
        <span className={styles.form}>
        <label>Estimated Annual Income</label>
        <input type="text" id="income" defaultValue="$" />
        
        <label>Language</label>
        <select name="languages" id="languages">
          <option>English</option>
          <option>Spanish</option>
        </select>

        <label>Citizenship</label>
        <select name="citizenship" id="citizenship">
          <option></option> 
          { 
          Object.keys(Citizenship)
                .filter((elt: any) => !isNaN(Number(Citizenship[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </select>

        <label>Parent Age</label>
        <input type="text" id="parentAge"/>

        <label>Child Age</label>
        <input type="text" id="childAge"/>

        <label>Family Type</label>
        <select name="family" id="family">
          <option></option> 
          { 
          Object.keys(Family)
                .filter((elt: any) => !isNaN(Number(Family[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </select>

        <label>Employment Status</label>
        <select name="work" id="work">
          <option></option> 
          { 
          Object.keys(EmploymentStatus)
                .filter((elt: any) => !isNaN(Number(EmploymentStatus[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </select>

        <label>Insurance Type</label>
        <select name="insurance" id="insurance">
          <option></option> 
          { 
          Object.keys(Insurance)
                .filter((elt: any) => !isNaN(Number(Insurance[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </select>

        <label>Accesibility Needs</label>
        <select name="accessibility" id="accessibility">
          <option></option> 
          { 
          Object.keys(Accessibility)
                .filter((elt: any) => !isNaN(Number(Accessibility[elt])))
                .map(element => <option key={element}>{element}</option>)
          }
        </select>

        <button type="submit">Submit</button>
        </span>
      </form>

    </div>
    
  )
}

export default Quiz
