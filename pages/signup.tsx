import type { NextPage } from "next";
import Link from "next/link";
import styles from "./form.module.css";

const Home: NextPage = () => {
  return (
    <form>
      <ul className={styles.formlist}>
        <li>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/d/d4/2007_OrientHeights_Boston_419566537.jpg"
            }
            height={300}
          />
        </li>
        <li className={styles.formlistitem}>
          <label>
            Email: <input type="text" name="email" />
          </label>
        </li>
        <li className={styles.formlistitem}>
          <label>
            Password: <input type="password" name="password" />
          </label>
        </li>
        <li className={styles.formlistitem}>
          <label>
            Confirm password: <input type="password" name="confirmpassword" />
          </label>
        </li>
        <li>
          <label>
            Admin: <input type="checkbox" name="admin" />
          </label>
        </li>
        <li className={styles.formlistitem}>
          <div>
            <input type="submit" value="Submit" id={styles.submitbutton} />
            <Link href="/login">
              <a className={styles.a}>Log in with an existing account</a>
            </Link>
          </div>
        </li>
      </ul>
    </form>
  );
};

export default Home;
