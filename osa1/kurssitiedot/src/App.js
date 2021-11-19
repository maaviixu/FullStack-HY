import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

const Header = (course) => {
  //console.log(props)
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = (parts) => {
  console.log(parts)
  console.log(parts.parts[0].name)
  return (
    <div>
      <Part nimi={parts.parts[0].name} maara={parts.parts[0].exercises} />
      <Part nimi={parts.parts[1].name} maara={parts.parts[1].exercises} />
      <Part nimi={parts.parts[2].name} maara={parts.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  //console.log(props)
  return (
    <div>
      <p> {props.nimi} {props.maara} </p>
    </div>
  )
}

const Total = (parts) => {
  //console.log(parts)
  return (
    <div>
      <p> Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises} </p>
    </div>
  )
}

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App