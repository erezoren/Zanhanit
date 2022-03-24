import styles from '../styles/Home.module.css'
import {getAllTicketsDates, getTickets} from '../lib/ticketsHandler';
import {useEffect, useState} from 'react';
import {dateStamp} from "../lib/common_utils";
import {Header} from "../components/common/Header";
import axios from "axios";
import {TicketsTable} from "../components/tickets/TicketsTable";
import {DatesDropdown} from "../components/tickets/DatesDropdown";
import {AddTicket} from "../components/tickets/AddTicket";

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
  const [selectedDate, setSelectedDate] = useState(allDatesSorted[0]);
  const [selectedTickets, setSelectedTickets] = useState(tickets);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    axios.get(`/api/tickets?date=${selectedDate}`)
    .then((response) => {
      setSelectedTickets(response.data);
    });
  }, [selectedDate, nonce])

  return (
      <div className={styles.container} dir="rtl">
        <Header/>
        <AddTicket setNonce={setNonce} selectedDate={selectedDate}/>
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
