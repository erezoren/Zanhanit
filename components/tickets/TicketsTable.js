import {Table} from "react-bootstrap";

export const TicketsTable=({selectedTickets})=>{
  function sortTicketsMap() {
    return Object.keys(selectedTickets || {}).sort(
        (name1, name2) => name1.localeCompare(name2));
  }
  return(
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

  )
}