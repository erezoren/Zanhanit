import {Dropdown} from "react-bootstrap";

export const DatesDropdown=({allDatesSorted,setSelectedDate,selectedDate})=>{

  return(
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
  )
}