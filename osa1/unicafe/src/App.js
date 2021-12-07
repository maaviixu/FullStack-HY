import React, { useState } from 'react'

const Statistics = (props) => {
  console.log(props)
  if (props.allClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    
      <table>
        <tbody>
          <StaticsLine text="good" value={props.good} />
          <StaticsLine text="neutral" value={props.neutral} />
          <StaticsLine text="bad" value={props.bad} />
          <StaticsLine text="all" value={props.allClicks} />
          <StaticsLine text="average" value={(props.good + props.bad*-1)/(props.allClicks)} />
          <StaticsLine text="positive" value={(props.good/props.allClicks)*100} />
        </tbody>
      </table>
    
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StaticsLine = (props) => {
  console.log(props)
  console.log(props.text)
  console.log(props.value)
  if (props.text === "positive") {
    return (
      <tr>
      <td>{props.text}</td>
      <td>{props.value} %</td>
    </tr>
    )
  }
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}  />
    </div>
  )
}

export default App