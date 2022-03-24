import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {Login} from "../components/admin/Login";
import {AddEvent} from "../components/admin/AddEvent";

export default function Admin(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <Login/>
        <AddEvent/>
      </div>
  )
}
