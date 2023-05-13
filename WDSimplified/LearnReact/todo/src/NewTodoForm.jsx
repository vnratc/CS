import { useState } from "react"

// export function NewTodoForm(props) { // better way is to destructure
export function NewTodoForm({ onSubmit }) { // Destructuring argument to avoid typing "props.onSubmit" on line 11
  const [newItem, setNewItem] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === "") return

    onSubmit(newItem)

    setNewItem("")
  }


  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New TODO Item</label>
        <input
          autoFocus={true}
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
} 