import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {Login} from "../components/admin/Login";
import {AddEvent} from "../components/admin/AddEvent";
import {AddBarmens} from "../components/admin/AddBarmens";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {isEqual} from 'lodash'
import {PERMISSIONS} from "../components/common/constants";

export default function Admin(props) {
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    axios.get('/api/auth')
    .then((response) => {
      setPermissions(jwt_decode(response.data.accessToken).permissions);
    }).catch(error=>{
      console.log(error)
    });

  }, [])

  const {user} = useUser();
  return (
      <div className={styles.container}>
        <Header/>
        <Login/>
        {user && permissions.includes(PERMISSIONS.ADMIN) && <div>
          <AddEvent/>
          <hr/>
          <hr/>
          <hr/>
          <AddBarmens/>
        </div>}
        {/*<p>{permissions.toString()}</p>*/}
      </div>
  )

}
