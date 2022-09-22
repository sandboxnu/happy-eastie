import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const Quiz: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>

      <form action="/results" method="post">
        <label>Estimated Annual Income</label>
        <input type="text" id="income" defaultValue="$" />
        
        <label>Language</label>
        <select name="languages" id="languages">
          <option></option>
          <option>English</option>
          <option>Spanish</option>
        </select>

        <label>Citizenship</label>
        <input type="text" id="citizenship"/>

        <label>Parent Age</label>
        <input type="text" id="parentAge"/>

        <label>Child Age</label>
        <input type="text" id="childAge"/>

        <label>Family Type</label>
        <input type="text" id="familyType"/>

        <label>Employment Status</label>
        <input type="text" id="employmentType"/>

        <label>Insurance Type</label>
        <input type="text" id="insuranceType"/>

        <label>Accesibility Needs</label>
        <input type="text" id="accessibility"/>

        <button type="submit">Submit</button>
      </form>

    </div>
    
  )
}

export default Quiz
