import {Button, Table} from "react-bootstrap";

const XLSX = require('xlsx')

export const TicketsTable = ({selectedTickets, exportFileName}) => {
  function sortTicketsMap() {
    return Object.keys(selectedTickets || {}).sort(
        (name1, name2) => name1.localeCompare(name2));
  }

  const exportToExcel = () => {
    const data = [];

    sortTicketsMap().map(
        (name, idx) => {
          let row = {};
          selectedTickets[name].map(ticket => {
            data.push({
              "שם": name,
              "# כרטיסיה": ticket
            })
          })
        })

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Responses')
    XLSX.writeFile(wb, `Zanhanit_Tickets_${exportFileName}.xlsx`)

  }

  return (
      <div>
        <Button variant={"info"} onClick={exportToExcel}>ייצוא לקובץ</Button>
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