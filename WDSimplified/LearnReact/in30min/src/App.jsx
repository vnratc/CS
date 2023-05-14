import { useState } from 'react'
import './App.css'

function App() {
  const [todosByUser, setTodosByUser] = useState([])
  const [loading, setLoading] = useState({ btnDisabled: false, preloader: "" })

  async function fetchItems(e) {
    setLoading({ btnDisabled: true, preloader: "preloader" })
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

        // console.log(groupedByUser)

        const groupedWithCompleted = groupedByUser.map(user => {
          const completed = user.filter(todo => todo.completed).length
          const notCompleted = user.filter(todo => !todo.completed).length
          // console.log(completed, notCompleted)
          return {data: [...user], ratio: { completed, notCompleted }}
        });

        console.log(groupedWithCompleted)

        setTodosByUser(groupedWithCompleted)
      })
    setLoading({ btnDisabled: false, preloader: "" })
  }


  let todoItems = []
  const userItems = todosByUser.map((user, index) => {
    // console.log(user)
    return (
    <li key={`user${user.data[index].userId}`}>
      User {user.data[index].userId}, {user.ratio.completed} / {user.ratio.notCompleted}
      <ul>{todoItems = user.data.map(todo => {
        return (
          <li key={todo.id}>
            {todo.title}, {String(todo.completed)}
          </li>
        )
      })}</ul>
    </li>
    )})


  return (
    <>
      <form onSubmit={fetchItems}>
        <button disabled={loading.btnDisabled} id="btn">Send Request</button>
        <div className={loading.preloader}></div>
      </form>

      <ul>{userItems}</ul>
    </>
  )
}


export default App
