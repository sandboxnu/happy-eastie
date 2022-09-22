import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const Quiz: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Quiz Page</h1>
      <Link href='/'>Back to Home</Link>
      <br />
      <br />
      <form action="/results" method="post">
        <label>Estimated Annual Income:</label>
        <br />
        <br />
        <input type="text" defaultValue="$" />
        <br />
        <br />
        <label>Language</label>
        <br />
        <br />
        <select name="languages" id="languages">
          <option></option>
          <option>English</option>
          <option>Spanish</option>
        </select>
        <br />
        <br />
        <label>Citizenship</label>
        <br />
        <br />
        <input type="text"/>
        <br />
        <br />
        <label>Parent Age</label>
        <br />
        <br />
        <input type="text"/>
        <br />
        <br />
        <label>Child Age</label>
        <br />
        <br />
        <input type="text"/>
        <br />
        <br />
        <label>Family Type</label>
        <br />
        <br />
        <input type="text"/>
        <br />
        <br />
        <label>Employment Status</label>
        <br />
        <br />
        <input type="text"/>
        <br />
        <br />
        <label>Insurance Type</label>
        <br />
        <br />
        <input type="text"/>
        <br />
        <br />
        <label>Accesibility Needs</label>
        <br />
        <br />
        <input type="text"/>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
    
  )
}

export default Quiz
