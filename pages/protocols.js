import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {getAllContent} from "../lib/protocolesHandler";


export async function getServerSideProps(context) {
  return {
    props: {
      all:await getAllContent()
    },
  }
}

const traverseContent=(all, content_arr)=>{
  if(all==undefined){
    return;
  }
  all.forEach(item=>{
    content_arr.push(<div>{item.nodeType}</div>)
    traverseContent(item.content,content_arr)
  })
  return content_arr;

}

export default function Protocols(props) {
  const {all} = props;
  return (
      <div className={styles.container}>
        <Header/>
        {traverseContent(all[0].fields.closingThePub.content,[])}
      </div>
  )
}
