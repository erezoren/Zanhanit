import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {Login} from "../components/admin/Login";
import {AddEvent} from "../components/admin/AddEvent";
import {AddBarmens} from "../components/admin/AddBarmens";
import {useUser} from "@auth0/nextjs-auth0";

export default function Admin(props) {

  const {user} = useUser();

  return (
      <div className={styles.container}>
        <Header/>
        <Login/>
        {user && <div>
          <AddEvent/>
          <hr/>
          <hr/>
          <hr/>
          <AddBarmens/>
        </div>}
      </div>
  )
}
