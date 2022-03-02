const ticketsHandler = require("../../lib/ticketsHandler")
export default function handler(req, res) {
  //const body = JSON.parse(req.body)
 /* ticketsHandler.addTicket(body.name, body.ticket_number)
  .then(addTicketRes => {
    res.status(200).send(req);
  })*/
  res.status(200).json(req);
}
