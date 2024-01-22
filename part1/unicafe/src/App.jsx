import { useState } from 'react'

const Button = ({ text, addOne }) => {
  return <button onClick={addOne} id={text}>{text}</button>
}

const Stats = ({g, n, b}) => {
  const all = g+n+b
  if (all===0) return <p>No feedback given</p>
  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{g}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{n}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{b}</td>
        </tr>
        <tr>
          <td>All</td>
          <td>{all}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{(g-b)/all}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{g/all*100} %</td>
        </tr>
      </tbody>
    </table>
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