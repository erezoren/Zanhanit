import styles from '../styles/Home.module.css'
import {getAllTicketsDates, getTickets} from '../lib/ticketsHandler';
import {useEffect, useState} from 'react';
import {db} from "../firebase/clientApp";
import {doc, getDoc, setDoc} from 'firebase/firestore'
import {dateStamp} from "../lib/common_utils";
import {Button, Form, Stack} from "react-bootstrap";
import {Header} from "../components/common/Header";
import axios from "axios";
import {TicketsTable} from "../components/tickets/TicketsTable";
import {DatesDropdown} from "../components/tickets/DatesDropdown";

let _ = require('lodash/core');

export async function getServerSideProps(context) {
  return {
    props: {
      tickets: await getTickets(dateStamp()),
      allDates: await getAllTicketsDates()
    },
  }
}

export default function Tickets(props) {
  const {tickets, allDates} = props;
  const allDatesSorted = allDates.filter(id => id != 'null').sort().reverse();
  const [name, setName] = useState("");
  const [ticketNumber, setTicketNumber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(allDatesSorted[0]);
  const [selectedTickets, setSelectedTickets] = useState(tickets);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    axios.get(`/api/tickets?date=${selectedDate}`)
    .then((response) => {
      setSelectedTickets(response.data);
    });
  }, [selectedDate, nonce])

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
    setNonce(x => x + 1);
    setName("");
    setTicketNumber(0);
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
          <Form.Control className="me-auto" placeholder="מספר כרטיס"
                        type="number" style={{width: "40%"}}
                        isInvalid={_.isEmpty(ticketNumber) || ticketNumber == 0}
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}/>
          <Button variant="secondary" onClick={addNewTicket}>הוסף</Button>
          <div className="vr"/>
        </Stack>
        <div>
          <DatesDropdown allDatesSorted={allDatesSorted}
                         selectedDate={selectedDate}
                         setSelectedDate={setSelectedDate}/>
        </div>

        <hr/>
        <TicketsTable selectedTickets={selectedTickets}/>
      </div>
  )

}
