import { useState } from 'react'
import './App.css'

function App() {
  const [todosByUser, setTodosByUser] = useState([])
  const [loading, setLoading] = useState({btnDisabled: false, preloader: ""})

  async function fetchItems(e) {
    setLoading({btnDisabled: true, preloader: "preloader"})
    e.preventDefault()
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        const groupedByUser = data.reduce((groupedUsers, obj) => {
          const userId = obj.userId
          if (!groupedUsers[userId]) groupedUsers[userId] = []
          groupedUsers[userId].push(obj)
          return groupedUsers
        }, []).slice(1)

        console.log(groupedByUser)

        // const groupedWithCompleted = groupedByUser.map(user => {
        //   const completed = user.filter(todo => todo.completed).length
        //   const notCompleted = user.filter(todo => !todo.completed).length
        //   // console.log(completed, notCompleted)
        //   return [...user, {completed, notCompleted}]
        // });

        // console.log(groupedWithCompleted)

        setTodosByUser(groupedByUser)
      })
    setLoading({btnDisabled: false, preloader: ""})
  }


  let todoItems = []
  todosByUser.map(user => {
    todoItems = user.map(todo => 
      <li key={todo.id}>
        {todo.title}, {String(todo.completed)}
      </li>
      )
  }) 


  const listItems = todosByUser.map((user, index) =>
    <li key={`user${user[index].userId}`}>
      User {user[index].userId}
        <ul>{todoItems}</ul>
    </li>
  )


  return (
    <>
      <form onSubmit={fetchItems}>
        <button disabled={loading.btnDisabled} id="btn">Send Request</button>
        <div className={loading.preloader}></div>
      </form>

      <ul>{listItems}</ul>
    </>
  )
}


export default App
