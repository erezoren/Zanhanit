import styles from '../styles/Home.module.css'
import homeStyle from '../styles/home-page.module.css'
import {Header} from "../components/common/Header";
import {getBarmens} from "../lib/barmensHandler";

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
          <span className={homeStyle.welcomeTitle}><h3 className="display-1">ברמנים/יות</h3></span>

          <div>
          </div>

          <hr/>
         {/* <EventsDisplay selectedEvents={selectedEvents}/>*/}
        </div>
      </div>
  )
}