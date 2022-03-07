import styles from '../styles/Home.module.css'
import {Header} from "../components/Header";
import Carousel from 'react-bootstrap/Carousel';
import {useState} from "react";
import {getAndCachePictures} from "../lib/picturesHandlerServer";
import {Loader} from "../components/Loader";

let _ = require('lodash/core');

export async function getServerSideProps(context) {
  return {
    props: {
      pictures: await getAndCachePictures()
    },
  }
}

export default function Pictures(props) {
  const [loading, setLoading] = useState(true);

  const {pictures} = props;
  console.log(pictures)
  return (
      <div className={styles.container} dir="rtl">
        <Header/>
        <div style={{textAlign: "center"}}>

          <Carousel variant="dark" fade={true} pause={false}>
            {pictures.filter(
                pic => pic.toLowerCase().endsWith(".jpg") || pic.endsWith(
                    ".png")).map((pic, idx) => {
              return <Carousel.Item key={idx} interval={3000}>
                <img className={"img-fluid"}
                    src={pic}
                />
              </Carousel.Item>
            })
            }
          </Carousel>
        </div>
      </div>
  )

}
