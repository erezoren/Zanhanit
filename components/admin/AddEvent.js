import {Button, Form} from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {useState} from "react";
import moment from "moment";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/clientApp";
import {COLLECTIONS} from "../common/constants";

let _ = require('lodash/core');

export const AddEvent = (props) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventEmbd, setEventEmbd] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventDate, setEventDate] = useState(null);

  const resetForm = () => {
    setEventTitle("");
    setEventDesc("");
    setEventImage("");
    setEventEmbd("");
  }

  async function saveEvent() {
    if (_.isEmpty(eventTitle) || _.isEmpty(eventDesc)
        || _.isNull(eventDate)) {
      return;
    }
    let newEvent = {
      title: eventTitle,
      description: eventDesc,
      image_url: eventImage,
      embd_media: eventEmbd,
    }
    let events = await getEventsByDate(eventDate);
    events.push(newEvent);
    await setDoc(doc(db, COLLECTIONS.EVENTS, eventDate), {['events']: events},
        {merge: true});
    resetForm();
  }

  const getEventsByDate = async (date) => {
    const eventsRef = doc(db, COLLECTIONS.EVENTS, date);
    let events = await getDoc(eventsRef);
    return events.data() ? (events.data()['events'] || []) : [];
  }

  const handleEventDate = (event) => {
    let date = moment(event._d).format('DD-MM-YYYY');
    setEventDate(date);
  }

  return (
      <div className={styles.container} dir="rtl">
        <h1>הוספת אירוע</h1>
        <Form>

          <Form.Group className="mb-3" controlId="eventDate">
            <Form.Label>תאריך</Form.Label>
            <Datetime dateFormat={"DD-MM-YYYY"} timeFormat={false}
                      className={"eventDataPicker"} input={false}
                      onChange={(e) => handleEventDate(e)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="eventName">
            <Form.Label>שם האירוע</Form.Label>
            <Form.Control type="text" placeholder="הכנס שם" value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="eventDesc">
            <Form.Label>תיאור</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="הכנס תיאור"
                          value={eventDesc}
                          onChange={(e) => setEventDesc(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="eventImage">
            <Form.Label>לינק לתמונה</Form.Label>
            <Form.Control type="text" placeholder="הכנס לינק" value={eventImage}
                          onChange={(e) => setEventImage(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="eventEmbd">
            <Form.Label>קוד HTML</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="הכנס קוד"
                          value={eventEmbd}
                          onChange={(e) => setEventEmbd(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="button" onClick={saveEvent}>
            שמור
          </Button>
        </Form>

      </div>
  )
}