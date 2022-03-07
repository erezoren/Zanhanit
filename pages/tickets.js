import styles from '../styles/Home.module.css'
import {getAllDates, getTickets} from '../lib/ticketsHandler';
import {useEffect, useState} from 'react';
import {db} from "../firebase/clientApp";
import {doc, getDoc, setDoc} from 'firebase/firestore'
import {dateStamp} from "../lib/common_utils";
import Router from "next/router"
import {Button, Dropdown, Form, Stack, Table} from "react-bootstrap";
import {Header} from "../components/Header";
import axios from "axios";

let _ = require('lodash/core');

export async function getServerSideProps(context) {
  return {
    props: {
      tickets: await getTickets(dateStamp()),
      allDates: await getAllDates()
    },
  }
}

export default function Tickets(props) {
  const {tickets, allDates} = props;
  const allDatesSorted = allDates.filter(id=>id!='null').sort().reverse();
  const [name, setName] = useState("");
  const [ticketNumber, setTicketNumber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(allDatesSorted[0]);
  const [selectedTickets,setSelectedTickets] = useState(tickets);

  useEffect(()=>{
    axios.get(`/api/tickets?date=${selectedDate}`)
    .then((response) => {
      setSelectedTickets(response.data);
    });
  },[selectedDate])

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

  function sortTicketsMap() {
    return Object.keys(selectedTickets || {}).sort(
        (name1, name2) => name1.localeCompare(name2));
  }
  return (
      <div className={styles.container} dir="rtl">
        <Header/>
        <Stack direction="horizontal" gap={3}>
          <Form.Control className="me-auto" placeholder="שם מלא"
                        isInvalid={_.isEmpty(name.trim())}
                        onChange={(e) => setName(e.target.value)}/>
          <Form.Control className="me-auto" placeholder="מספר כרטיס"
                        type="number" style={{width: "40%"}}
                        isInvalid={_.isEmpty(ticketNumber)}
                        onChange={(e) => setTicketNumber(e.target.value)}/>
          <Button variant="secondary" onClick={addNewTicket}>הוסף</Button>
          <div className="vr"/>
        </Stack>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              {selectedDate}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                allDatesSorted.map((date) => {
                  return <Dropdown.Item key={date} onClick={()=>setSelectedDate(date)}>{date}</Dropdown.Item>
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>

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
            sortTicketsMap().map(
                (name, idx) => {
                  return <tr key={idx}>
                    <td>{idx}</td>
                    <td>{name}</td>
                    <td>
                      <ul>
                        {
                          selectedTickets[name].map(ticket => {
                            return <li key={ticket}>{ticket}</li>
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
