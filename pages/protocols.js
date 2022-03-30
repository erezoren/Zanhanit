import styles from '../styles/Home.module.css'
import homeStyle from '../styles/home-page.module.css'
import {Header} from "../components/common/Header";

export default function Protocols(props) {
  return (
      <div className={styles.container}>
        <Header/>
        <div className={styles.container} dir="rtl">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item"
                    src="https://docs.google.com/document/d/1PMT72COp4xVNFpMwQdzeSP_99GN7uuKOqcr4_Vp1ZYg/edit?usp=sharing"
                    allowFullScreen></iframe>
          </div>
        </div>
      </div>
  )
}
