import {Dropdown} from "react-bootstrap";
import moment from "moment";
import {useEffect, useState} from "react";

export const DatesDropdown = ({allDates, setSelectedDate, selectedDate}) => {

  const [sortedSated, setSortedDates] = useState([]);
  useEffect(() => {
    let sorted = allDates.sort((d1, d2) => {
      let m1 = moment(d1, "DD-MM-YYYY");
      let m2 = moment(d2, "DD-MM-YYYY")
      debugger
      return m2 - m1;
    });
    setSelectedDate(sorted[0])
    setSortedDates(sorted)
  }, [allDates])

  return (
      <Dropdown>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          {selectedDate}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            sortedSated.map((date) => {
              return <Dropdown.Item key={date} onClick={() => setSelectedDate(
                  date)}>{date}</Dropdown.Item>
            })
          }
        </Dropdown.Menu>
      </Dropdown>
  )
}