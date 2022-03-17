import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import Profile from "../components/common/Profile";
import Link from 'next/link'

export default function Admin(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <Profile/>
        <h3 className="title">
          Read{' '}
          <Link href="/api/auth/login">
            <a>Login</a>
          </Link>
        </h3>
        <h3 className="title">
          Read{' '}
          <Link href="/api/auth/logout">
            <a>Logout</a>
          </Link>
        </h3>
        <div className={styles.container} dir="rtl">
          <p>הוספת אירוע</p>
        </div>
      </div>
  )
}
