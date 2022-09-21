import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import EffectMessage from './components/EffectMessage'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [effectMessage, setEffectMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = blog => {
    blogService.like(blog).then(() => {
      sortBlogs()
    })
  }

  const sortBlogs = () => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((first, second) =>
        (first.likes > second.likes) ? -1 : 1))
    }
    )
  }

  /*
  const handleLike = async blog => {
    await blogService.like(blog)

    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  */

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setEffectMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} is added`)
        setTimeout(() => {
          setEffectMessage(null)
        }, 5000)
      })

  }

  const removeBlog = async blog => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(blog)
      sortBlogs()
    }
  }

  const blogFormRef = useRef()


  return (
    <div>
      <EffectMessage message={effectMessage} />
      <ErrorMessage message={errorMessage} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> :
        <div>

          <h2>blogs</h2>

          <p>{user.name} logged in
            <button
              onClick={() => localStorage.removeItem('loggedBlogappUser')}>logout
            </button>
          </p>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog} />
          </Togglable>

          {blogs.map(blog =>
            <Blog
              blogs={blogs}
              handleLike={handleLike}
              removeBlog={removeBlog}
              key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App