import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Matti testailee',
    author: 'MATTI',
    url: 'www.matintestit.fi',
    likes: 100,
    user: {
      username: 'matti',
      name: 'Matti'
    }
  }

  const mockHandleLike = jest.fn()
  const mockRemoveBlog = jest.fn()

  beforeEach(() => {
    render(<Blog blog={blog} handleLike={mockHandleLike} removeBlog={mockRemoveBlog} />)
  })

  test('renders only title and author', () => {
    // screen.debug()
    const title = screen.findByText('Matti testailee')
    const author = screen.findByText('MATTI')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('renders title, author, url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    // screen.debug()
    const title = screen.findByText('Matti testailee')
    const author = screen.findByText('MATTI')
    const url = screen.findByText('www.matintestit.fi')
    const likes = screen.findByText('100')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})