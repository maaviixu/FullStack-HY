import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notifier } from "../reducers/notificationReducer"

const AnecdoteList = props => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) =>
      b.votes - a.votes)
    return sortedAnecdotes
  })

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(notifier(`You voted '${anecdote.content}'`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList