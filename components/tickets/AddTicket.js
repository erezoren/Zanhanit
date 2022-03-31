import {Button, Form, Stack} from "react-bootstrap";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/clientApp";
import {dateStamp} from "../../lib/common_utils";
import {useState} from "react";

let _ = require('lodash/core');

export const AddTicket = ({setNonce, selectedDate}) => {

  const [name, setName] = useState("");
  const [ticketNumber, setTicketNumber] = useState(null);

  async function addNewTicket() {
    if (_.isEmpty(name.trim()) || _.isEmpty(ticketNumber)) {
      return;
    }
    let tickets = await getTicketsByDateAndName(name, selectedDate);
    if (tickets.includes(ticketNumber)) {
      return;
    }
    tickets.push(ticketNumber)
    await setDoc(doc(db, "tickets", selectedDate), {[name]: tickets},
        {merge: true});
    setNonce(x => x + 1);
    setName("");
    setTicketNumber(0);
  }

  const getTicketsByDateAndName = async (name, date) => {
    const ticketsRef = doc(db, 'tickets', date);
    let tickets = await getDoc(ticketsRef);
    return tickets.data() ? (tickets.data()[name] || []) : [];
  }

  return (
      <div>
        <Stack direction="horizontal" gap={3}>
          <Form.Control className="me-auto" placeholder="שם מלא"
                        isInvalid={_.isEmpty(name.trim())}
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
          <Form.Control className="me-auto" placeholder="מספר כרטיס"
                        type="number" style={{width: "56%"}}
                        isInvalid={_.isEmpty(ticketNumber) || ticketNumber == 0}
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}/>
          <Button style={{width: "20%"}} variant="secondary" onClick={addNewTicket}>הוסף</Button>
          <div className="vr"/>
        </Stack>

      </div>
  )
}