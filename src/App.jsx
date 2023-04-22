import { useState } from "react"
import "./app.css"


export default function App() {
  const [newItem , setNewItem] = useState("")
  const [todos, setToDos] = useState([])

  //it handles the submit 
  function handleSubmit(e){
    e.preventDefault()

    setToDos( currentToDos => 
    {
      return [
        ...currentToDos,
        {id: crypto.randomUUID(), title: newItem, completed: false}
      ]
    }
    )
    setNewItem("")
  }

  // to mark if completed and delete
  function toggleToDo(id, completed){
    setToDos(currentToDos => 
      {
        return currentToDos.map(todo =>
          {
            if (todo.id === id ){
              return {...todo , completed}
            }
          })
      })
  }

  function deleteToDo(id){
    setToDos(currentToDos => 
      {
        return currentToDos.filter(todo => todo.id !== id )
      })
  }

  return <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <label htmlFor="item">Add New Item</label>
      <input 
      value={newItem} 
      onChange={e => setNewItem(e.target.value)}
      type="text" 
      id="item" 
      />
      <button className="btn" >Add </button>
    </form>

    <h1>ToDo List</h1>
    
    <ul className="list">
    {todos.length === 0 && "No Todos"}
    {todos.map (todo => {
      return (
      <li key={todo.id}>
      <label >
        <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={e => toggleToDo(todo.id, e.target.checked)}
        />
        {todo.title}
      </label>
      <button onClick={()=> deleteToDo(todo.id)} className="btn btn-danger"> DELETE</button>
    </li>
      )
    }
    )}

      
    </ul>
  </>
}