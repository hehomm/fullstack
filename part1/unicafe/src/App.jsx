import { useState } from 'react'

const Button = ({ text, addOne }) => {
  return <button onClick={addOne} id={text}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  if (text==="Positive") return <div>{text}: {value*100} %</div>
  return <div>{text}: {value}</div>
}

const Stats = ({g, n, b}) => {
  const all = g+n+b
  if (all===0) return <p>No feedback given</p>
  return (
    <>
      <StatisticLine text={"Good"} value={g}/>
      <StatisticLine text={"Neutral"} value={n}/>
      <StatisticLine text={"Bad"} value={b}/>
      <StatisticLine text={"All"} value={all}/>
      <StatisticLine text={"Average"} value={(g-b)/all}/>
      <StatisticLine text={"Positive"} value={g/all}/>
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
      <h1>Statistics</h1>
      <Stats g={good} n={neutral} b={bad}/>
    </div>
  )
}

export default App