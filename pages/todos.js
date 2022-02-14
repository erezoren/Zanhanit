import styles from '../styles/Home.module.css'


export async function getServerSideProps(context) {
    console.log("Server side");
    return {
      props: {
        todos : ['one','tow','three']
      }, // will be passed to the page component as props
    }
  }
export default function Todos(props) {
    const {todos} = props;
  return (
    <div className={styles.container}>
     <h1>TODOS</h1>
     <ul>
        {todos.map(t=>{
           return  <li>{t}</li>
        })}
        </ul>
        <a href='./'>Home</a>
    </div>
  )
}
