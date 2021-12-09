import React from "react";

const Course = (props) => {
    //console.log(props)
    const { course } = props
    //console.log(course)
    return (
    <div>
      <Header course = {course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />  
    </div>
    
    )
  }

  const Header = (props) => {
    console.log(props)
    const { course } = props
    //console.log('headerissa: ', course.name)
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
  
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
  
      </div>
    )
  }

  const Part = ({part}) => {
    //console.log(props)
    return (
      <div>
        <p> {part.name} {part.exercises} </p>
      </div>
    )
  }

  
  const Total = ({parts}) => {
    let total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <p>
        <b>total of {total} exercises</b>
      </p>
    )
  }

  export default Course