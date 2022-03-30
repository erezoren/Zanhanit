const todos = ['one', 'tow', 'three'];


export const addTodo = (text) => {
    todos.push(text);
}

export const getTodos=()=>{
    return todos;
}

