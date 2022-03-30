import {Card, Col, Container, Row} from "react-bootstrap";

export const EventsDisplay = ({selectedEvents}) => {
  return (
      <div>
        <Container>
          <Row>
          {
            selectedEvents.events
            && selectedEvents.events.map(
                (event, idx) => {
                  return <Col sm={"auto"} key={idx}>
                    <Card style={{width: '18rem'}}>
                      <Card.Img variant="top" src={event.image_url}/>
                      <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                          {event.description}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <div
                            dangerouslySetInnerHTML={{__html: event.embd_media}}></div>
                      </Card.Footer>
                    </Card>
                  </Col>
                })
          }
          </Row>
        </Container>
      </div>

  )
}
