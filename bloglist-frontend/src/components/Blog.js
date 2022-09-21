import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={
          () => setVisible(previousVisible => !previousVisible)}
        >{visible ? 'hide' : 'view'}</button>
      </div>
      <div>
        {visible && (<div>
          <div>{blog.url}</div>
          <div> likes <span>{blog.likes}</span> <button id="like-button" onClick={() => handleLike(blog)}>like</button></div>
          <div>{blog.user.name}</div>
          <div><button onClick={() => removeBlog(blog)}>remove</button></div>
        </div>)}
      </div>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}


export default Blog