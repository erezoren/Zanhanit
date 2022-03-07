import styles from '../styles/Home.module.css'
import homeStyle from '../styles/home-page.module.css'
import {Header} from "../components/Header";

export default function Events(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <div className={styles.container} dir="rtl">
          <span className={homeStyle.welcomeTitle}><h3 className="display-1">אירועים קרובים</h3></span>
        </div>
      </div>
  )
}
