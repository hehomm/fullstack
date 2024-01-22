import { useState } from 'react'

const Button = ({ text, addOne }) => {
  return <button onClick={addOne} id={text}>{text}</button>
}

const Stats = ({g, n, b}) => {
  return (
    <>
      <h1>Statistics</h1>
      <p>Good: {g}</p>
      <p>Neutral: {n}</p>
      <p>Bad: {b}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log([good, neutral, bad])

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} addOne={addGood}/>
      <Button text={"neutral"} addOne={addNeutral}/>
      <Button text={"bad"} addOne={addBad}/>
      <Stats g={good} n={neutral} b={bad}/>
    </div>
  )
}

export default App