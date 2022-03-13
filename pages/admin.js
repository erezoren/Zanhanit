import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import Profile from "../components/common/Profile";

export default function Admin(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <Profile/>
        <a href="/api/auth/login">Login</a>
        <br/>
        <a href="/api/auth/logout">Logout</a>
        <div className={styles.container} dir="rtl">
          <p>הוספת אירוע</p>
        </div>
      </div>
  )
}
