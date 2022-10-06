import React from "react"
import { useDispatch } from "react-redux"
import { notifier } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notifier(`You added '${content}'`, 5000))
  }
  
  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm