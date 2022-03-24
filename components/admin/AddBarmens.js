import {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/clientApp";
import moment from "moment";
import styles from "../../styles/Home.module.css";
import {Button, Form} from "react-bootstrap";
import Datetime from "react-datetime";
import {COLLECTIONS} from "../common/constants";

export const AddBarmens = (props) => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [barmensDate, setBarmensDate] = useState(null);

  const resetForm = () => {
    setName1("");
    setName2("");
  }

  async function saveBarmens() {
    if (_.isEmpty(name1) || _.isEmpty(name2)
        || _.isNull(barmensDate)) {
      return;
    }

    let barmens = [name1, name2];
    await setDoc(doc(db, COLLECTIONS.BARMENS, barmensDate), {['barmens']: barmens},
        {merge: false});
    resetForm();
  }


  const handleBarmensDate = (event) => {
    let date = moment(event._d).format('DD-MM-YYYY');
    setBarmensDate(date);
  }

  return (
      <div className={styles.container} dir="rtl">
        <h1>הוספת ברמנים</h1>
        <Form>

          <Form.Group className="mb-3" controlId="eventDate">
            <Form.Label>תאריך</Form.Label>
            <Datetime dateFormat={"DD-MM-YYYY"} timeFormat={false}
                      className={"eventDataPicker"} input={false}
                      onChange={(e) => handleBarmensDate(e)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="barmen1">
            <Form.Label>ברמנ/ית 1</Form.Label>
            <Form.Control type="text" placeholder="הכנס שם" value={name1}
                          onChange={(e) => setName1(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="barmen2">
            <Form.Label>ברמנ/ית 2</Form.Label>
            <Form.Control type="text" placeholder="הכנס שם" value={name2}
                          onChange={(e) => setName2(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="button" onClick={saveBarmens}>
            שמור
          </Button>
        </Form>

      </div>)
}