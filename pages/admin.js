import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {Login} from "../components/admin/Login";
import {AddEvent} from "../components/admin/AddEvent";
import {AddBarmens} from "../components/admin/AddBarmens";

export default function Admin(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <Login/>
        <AddEvent/>
        <hr/> <hr/> <hr/>
        <AddBarmens/>
      </div>
  )
}
