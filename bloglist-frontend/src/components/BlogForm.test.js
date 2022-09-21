import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<creating a new blog', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#title-input')
  const author = container.querySelector('#author-input')
  const url = container.querySelector('#url-input')

  // const title = screen.getByPlaceholderText('write title here')
  // const author = screen.getByPlaceholderText('write author here')
  // const url = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(title, 'Matin testiblogi')
  await user.type(author, 'Keijo')
  await user.type(url, 'www.matintestit.fi')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Matin testiblogi')
  expect(createBlog.mock.calls[0][0].author).toBe('Keijo')
  expect(createBlog.mock.calls[0][0].url).toBe('www.matintestit.fi')
})