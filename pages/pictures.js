import styles from '../styles/Home.module.css'
import {Header} from "../components/Header";
import Carousel from 'react-bootstrap/Carousel';
import {useState} from "react";
import {getAndCachePictures} from "../lib/picturesHandlerServer";
import {listAllPictures} from "../lib/picturesHandlerClient";

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
          <Carousel variant="dark" fade={true} wrap={true} touch={true}>
            {pictures.map((pic, idx) => {
              return <Carousel.Item key={idx} interval={3000}>
                <img
                    src={pic}
                    width={"80%"}
                />
                <Carousel.Caption>
                  <h3>Slide label</h3>
                </Carousel.Caption>
              </Carousel.Item>
            })
            }
          </Carousel>
        </div>
      </div>
  )

}
