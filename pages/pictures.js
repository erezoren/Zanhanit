import styles from '../styles/Home.module.css'
import {Header} from "../components/Header";
import Carousel from 'react-bootstrap/Carousel';
import {listAllPictures} from "../lib/picturesHandler";
import {useEffect, useRef, useState} from "react";
import {Loader} from "../components/Loader";

let _ = require('lodash/core');

export async function getServerSideProps(context) {
  return {
    props: {
      pictures: []
    },
  }
}

export default function Pictures(props) {
  const picturesRef = useRef([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPictures = async () => {
      let allpics = await listAllPictures();
      return allpics.map(async (pic) => {
        return await pic;
      })
    };
    fetchPictures().then(res => {
      let allPIcs = res.map(pic => {
        return pic.then(url => {
          picturesRef.current.push(url);
        }).then(res => {
          //TODO: set false when really ends
          if (picturesRef.current.length > 100) {
            setLoading(false)
          }
        })

      })
    })
  }, [])

  return (
      <div className={styles.container} dir="rtl">
        <Header/>
        <div style={{textAlign: "center"}}>

          <Carousel variant="dark" fade={true} wrap={true} touch={true}>
            {loading && <Loader/>}
            {!loading &&
            picturesRef.current.map((pic, idx) => {
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
