import React from "react"
import { connect } from "react-redux"
import { notifier } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notifier(`You added '${content}'`, 5000)
  }
  
  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  createAnecdote,
  notifier
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm