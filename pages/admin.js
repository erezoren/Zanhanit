import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import Profile from "../components/common/Profile";
import Link from 'next/link'
import {useUser} from "@auth0/nextjs-auth0";

export default function Admin(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <h6 className="title">
          <Link href="/api/auth/login">
            <a>Login</a>
          </Link>
        </h6>
        <h6 className="title">
          <Link href="/api/auth/logout">
            <a>Logout</a>
          </Link>
        </h6>
        <div className={styles.container} dir="rtl">
          <p>הוספת אירוע</p>
        </div>
      </div>
  )
}
