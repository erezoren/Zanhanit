import styles from '../styles/Home.module.css'
import homeStyle from '../styles/home-page.module.css'
import {Header} from "../components/common/Header";
import {getBarmens} from "../lib/barmensHandler";
import {Accordion} from "react-bootstrap";
import moment from "moment";

export async function getServerSideProps(context) {
  return {
    props: {
      barmens: await getBarmens()
    },
  }
}

export default function Barmens(props) {
  const {barmens} = props;
  return (
      <div className={styles.container}>
        <Header/>
        <div className={styles.container} dir="rtl">
          <span className={homeStyle.welcomeTitle}><h3
              className="display-1">ברמנים/יות</h3></span>
          <Accordion defaultActiveKey="0" flush alwaysOpen>
            {
              barmens.sort((b1, b2) => {
               let m1  = moment(b1.date, "DD-MM-YYYY");
               let m2 =   moment(b2.date, "DD-MM-YYYY")
                return m2 - m1;
              }).map((bm,idx) => {
                return <Accordion.Item eventKey={idx} key={idx}>
                  <Accordion.Header>{bm.date}</Accordion.Header>
                  <Accordion.Body>
                  <ul>
                    {bm.barmens.map((name,idx) => {
                      return <li key={`n${idx}`}>{name}</li>
                    })}
                  </ul>
                  </Accordion.Body>
                </Accordion.Item>
              })
            }
          </Accordion>
          <div>
          </div>

          <hr/>
        </div>
      </div>
  )
}
