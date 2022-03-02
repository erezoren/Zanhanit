import styles from '../styles/Home.module.css'
import { getTodos,addTodo } from '../lib/todosHandler';
import { useState } from 'react';

export async function getServerSideProps(context) {
    console.log("Server side");
    return {
      props: {
        todos : getTodos()
      }, // will be passed to the page component as props
    }
  }
export default function Todos(props) {
    const {todos} = props;
    const[todo,setTodo] = useState('');
  return (
    <div className={styles.container}>
        <br/>
    <input type='text' onChange={(e)=>setTodo(e.target.value)}/> <button onClick={()=>addTodo(todo)}>Add</button>
     <h1>TODOS</h1>
     <ul>
        {todos.map((t,idx)=>{
           return  <li key={idx}>{t}</li>
        })}
        </ul>
        <a href='./'>Home</a>
    </div>
  )
}
