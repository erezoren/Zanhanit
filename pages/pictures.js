import styles from '../styles/Home.module.css'
import {Header} from "../components/Header";
import Carousel from 'react-bootstrap/Carousel';
import {useState} from "react";
import {getAndCachePictures} from "../lib/picturesHandlerServer";
import {Image} from "react-bootstrap";

let _ = require('lodash/core');

export async function getServerSideProps(context) {
  return {
    props: {
      pictures: await getAndCachePictures()
    },
  }
}

export default function Pictures(props) {
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
                <Image fluid={true} roundedCircle={true}
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
