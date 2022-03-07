import {getTickets} from "../../lib/ticketsHandler";

export default function handler(req, res) {
  getTickets(req.query.date).then(tickets=>{
    res.status(200).json(tickets);
  })

}
