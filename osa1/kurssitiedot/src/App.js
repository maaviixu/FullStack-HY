import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part nimi={props.name1} maara={props.ex1} />
      <Part nimi={props.name2} maara={props.ex2} />
      <Part nimi={props.name3} maara={props.ex3} />
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p> {props.nimi} {props.maara} </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p> Number of exercises {props.ex1 + props.ex2 + props.ex3} </p>
    </div>
  )
}

  return (
    <div>
      <Header course={course} />
      <Content name1={part1} ex1={exercises1}
               name2={part2} ex2={exercises2}
               name3={part3} ex3={exercises3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

export default App