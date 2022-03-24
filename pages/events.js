import styles from '../styles/Home.module.css'
import homeStyle from '../styles/home-page.module.css'
import {Header} from "../components/common/Header";
import {DatesDropdown} from "../components/tickets/DatesDropdown";
import {dateStamp} from "../lib/common_utils";
import {getAllEventDates, getEvents} from "../lib/eventsHandler";
import {useEffect, useState} from "react";
import axios from "axios";
import {EventsDisplay} from "../components/events/EventsDisplay";

export async function getServerSideProps(context) {
  return {
    props: {
      events: await getEvents(dateStamp()),
      allDates: await getAllEventDates()
    },
  }
}

export default function Events(props) {
  const {events, allDates} = props;
  const allDatesSorted = allDates.filter(id => id != 'null').sort().reverse();
  const [selectedDate, setSelectedDate] = useState(allDatesSorted[0]);
  const [selectedEvents, setSelectedEvents] = useState(events);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    debugger
    axios.get(`/api/events?date=${selectedDate}`)
    .then((response) => {
      setSelectedEvents(response.data);
    });
  }, [selectedDate, nonce])

  return (
      <div className={styles.container}>
        <Header/>
        <div className={styles.container} dir="rtl">
          <span className={homeStyle.welcomeTitle}><h3 className="display-1">אירועים קרובים</h3></span>

          <div>
            <DatesDropdown allDatesSorted={allDatesSorted}
                           selectedDate={selectedDate}
                           setSelectedDate={setSelectedDate}/>
          </div>

          <hr/>
          <EventsDisplay selectedEvents={selectedEvents}/>
        </div>
      </div>
  )
}
