const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    autho: 'Keijo',
    url: 'keijonkotisivut.com',
    likes: 234
  },
  {
    title: 'Kallen keittiössä',
    autho: 'Kalle',
    url: 'livelovelaugh.kalle',
    likes: 12
  },
  {
    title: 'Yrjön retket',
    autho: 'Yrjö',
    url: 'yrjöretekllä.com',
    likes: 1000
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'tämä poistoon', author: 'Kalle' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}


