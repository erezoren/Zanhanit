import styles from '../styles/Home.module.css'
import {getTickets} from '../lib/ticketsHandler';
import {useState} from 'react';
import {db} from "../firebase/clientApp";
import {doc, getDoc, setDoc} from 'firebase/firestore'
import {dateStamp} from "../lib/common_utils";
import Router from "next/router"
import {Button, Form, Stack, Table} from "react-bootstrap";
import {Header} from "../components/Header";

let _ = require('lodash/core');

export async function getServerSideProps(context) {
  return {
    props: {
      tickets: await getTickets(dateStamp())
    },
  }
}

export default function Tickets(props) {
  const {tickets} = props;
  const [name, setName] = useState("");
  const [ticketNumber, setTicketNumber] = useState(null);

  async function addNewTicket() {
    if (_.isEmpty(name.trim()) || _.isEmpty(ticketNumber)) {
      return;
    }
    let tickets = await getTicketsByDateAndName(name);
    if (tickets.includes(ticketNumber)) {
      return;
    }
    tickets.push(ticketNumber)
    await setDoc(doc(db, "tickets", dateStamp()), {[name]: tickets},
        {merge: true});
    await Router.replace(Router.asPath)
  }

  const getTicketsByDateAndName = async (name) => {
    const ticketsRef = doc(db, 'tickets', dateStamp());
    let tickets = await getDoc(ticketsRef);
    return tickets.data()[name] || [];
  }

  return (
      <div className={styles.container} dir="rtl">
        <Header/>
        <Stack direction="horizontal" gap={3}>
          <Form.Control className="me-auto" placeholder="שם מלא"
                        isInvalid={_.isEmpty(name.trim())}
                        onChange={(e) => setName(e.target.value)}/>
          <Form.Control className="me-auto" placeholder="מספר כרטיס"
                        type="number" style={{width: "20%"}}
                        isInvalid={_.isEmpty(ticketNumber)}
                        onChange={(e) => setTicketNumber(e.target.value)}/>
          <Button variant="secondary" onClick={addNewTicket}>הוסף</Button>
          <div className="vr"/>
        </Stack>
        <hr/>
        <Table striped bordered hover variant="dark">
          <thead>
          <tr>
            <th>#</th>
            <th>שם</th>
            <th>כרטיסים</th>
          </tr>
          </thead>
          <tbody>
          {
            Object.keys(tickets || {}).map((name, idx) => {
             return <tr>
                <td>{idx}</td>
                <td>{name}</td>
                <td>
                  <ul>
                    {
                      tickets[name].map(ticket => {
                        return <li>{ticket}</li>
                      })

                    }
                  </ul>

                </td>
              </tr>
            })
            }
            </tbody>
            </Table>
            </div>
            )

          }
