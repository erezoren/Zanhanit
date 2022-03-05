import styles from '../styles/Home.module.css'
import homeStyle from '../styles/home-page.module.css'
import {Header} from "../components/Header";

export default function Home(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <div className={styles.container} dir="rtl">
          <span className={homeStyle.welcomeTitle}>פאב הצנחנית להבות חביבה</span>
        </div>
      </div>
  )
}
