import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {Login} from "../components/admin/Login";
import {AddEvent} from "../components/admin/AddEvent";
import {AddBarmens} from "../components/admin/AddBarmens";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {PERMISSIONS} from "../components/common/constants";

export default function Admin(props) {
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    axios.get('/api/auth')
    .then((response) => {
      console.log(response.data.accessToken)
      setPermissions(jwt_decode(response.data.accessToken).permissions);
    }).catch(error => {
      console.log(error)
    });

  }, [])

  const {user} = useUser();
  return (
      <div className={styles.container}>
        <Header/>
        <Login/>
        {!user &&
        <h1 style={{direction:"rtl"}}>צריך להתחבר כדי לעשות פעולות כאן</h1>
        }
        {user && permissions.includes(PERMISSIONS.ADMIN) && <div>
          <AddEvent/>
          <hr/>
          <hr/>
          <hr/>
          <AddBarmens/>
        </div>}
        {user && !permissions.includes(PERMISSIONS.ADMIN) &&
        <h1 style={{direction:"rtl"}}>יש דרג ויש.....את/ה לא מורשה לעשות שינויים</h1>
        }
      </div>
  )

}
