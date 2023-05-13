export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      {/* onClick HAS TO HAVE AN ARROW FUNCTION () AS AN ARGUMENT, not the result of calling a function*/}
      <button
        onClick={() => deleteTodo(id)} className="btn btn-danger"
      >
        Delete
      </button>
    </li>
  )
}