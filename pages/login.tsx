import type { NextPage } from "next";
import Image from "next/image"
import styles from "./login.module.css";

const Home: NextPage = () => {
  return (
    <form>
      <ul className={styles.formlist}>
        <li>
          <img src={"https://www.bu.edu/files/2012/07/feat-crop-East_Boston-1600x1200.jpg"} height={300} />
        </li>
        <li className={styles.formlistitem}>
          <label>
            Username: <input type="text" name="username" />
          </label>
        </li>
        <li className={styles.formlistitem}>
          <label>
            Password: <input type="password" name="password" />
          </label>
        </li>
        <li className={styles.formlistitem}>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </li>
      </ul>
    </form>
  );
};

export default Home;
