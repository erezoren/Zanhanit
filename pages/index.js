import styles from '../styles/Home.module.css'
import homeStyle from '../styles/home-page.module.css'
import {Header} from "../components/common/Header";
import {Image} from "react-bootstrap";
import map from "../images/map.jpeg"

export default function Home(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <div className={styles.container} dir="rtl">
          <span className={homeStyle.welcomeText}>
            <p>אהלן חברים, ברוכים הבאים לאתר הפאב הקהילתי של להבות חביבה - פאב הצנחנית!</p>
<p>
הפאב נבנה על ידי חברי הקהילה, עבור חברי הקהילה.
</p>
<p>
ניפגש כל יום חמישי, פתיחת דלתות החל מ21:30. כניסה מגיל 18 ומעלה.
</p>
<p>
מוזמנים להצטרף לקבוצת <a target={"_blank"} rel="noreferrer"
    href={"https://chat.whatsapp.com/BEMYlcCqBtIAEDDehz50zD"}>הוואטסאפ</a> לקבלת עדכונים שוטפים:
</p>
<p>
הגשת שתיה בבר תהיה מול כרטיסיות שאפשר להזמין דרך שרון במזכירות, דרך המייל או הטלפון. כל כרטיסיה עולה 50 ש&quot;ח (ירד מכרטיס החבר). נא לציין איפה תרצו לקבל את הכרטיסיה: בדואר / במזכירות / בבר
</p>
<p>
נשמח למתנדבים לברמן ולתת בראש בעמדת הדיג'יי, פרטים אצל אלירן דובז'ינסקי.
</p>
<p>
בעמוד זה נעדכן לקראת ימי חמישי בכל מה שהולך לקרות אז תישארו מחוברים.
</p>
<p>
צניחה נעימה 😉
</p>
</span>
          <p>איך מגיעים?</p>
        <Image src={map}/>
 </div>
      </div>
  )
}
