import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  return (
    <div className={styles.container}>
     <p>Hello NEXT!!</p>
     <a href='./todos'>Todos</a>
    </div>
  )
}
