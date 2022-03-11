import {getEvents} from "../../lib/eventsHandler";

export default function handler(req, res) {
  getEvents(req.query.date).then(events=>{
    res.status(200).json(events);
  })

}
