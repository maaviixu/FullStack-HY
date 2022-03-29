import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import EffectMessage from './components/EffectMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [effectMessage, setEffectMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleAddBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle("")
        setAuthor("")
        setUrl("")
      })
      setEffectMessage(`a new blog ${title} by ${author} is added`)
      setTimeout(() => {
        setEffectMessage(null)
      }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <ErrorMessage message={errorMessage} />
      <h2>log in to application</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  
  const blogForm = () => (
    <div>
    <EffectMessage message={effectMessage} />
    <h2>create new</h2>

    <form onSubmit={handleAddBlog}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={(e) => {
            setTitle(e.target.value)}}
        />
      </div>
      <div>
        author:
          <input
          type="author"
          value={author}
          name="Author"
          onChange={(e) => {
            setAuthor(e.target.value)}}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={(e) => {
            setUrl(e.target.value)}}
        />
      </div>
      <button type="submit">create</button>
    </form> 
    
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )
  

  return (
    <div>
      
      {user === null ?
      loginForm() :
      <div>
        
        <h2>blogs</h2>
        
        <p>{user.name} logged in
        <button
          onClick={() => localStorage.removeItem('loggedBlogappUser')}>logout 
        </button>
        </p>
        {blogForm()}
      </div>
      }

      </div>
  )
}

export default App