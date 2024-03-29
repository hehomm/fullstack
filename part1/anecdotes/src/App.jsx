import { useState } from 'react'

const DisplayVotes = ({ votes, selected }) => {
  if (votes[selected] === 1) return <p>This anecdote has {votes[selected]} vote.</p>
  return <p>This anecdote has {votes[selected]} votes.</p>
}

const DisplayBest = ({ votes, anecdotes }) => {
  const voteArr = Object.values(votes)
  console.log(voteArr)
  const mostVotes = Math.max(...voteArr)
  const bestQuote = voteArr.indexOf(mostVotes)
  console.log("maximum", mostVotes, "best", bestQuote)
  return (
    <>
      <h1>Quote with the most votes</h1>
      <p>{anecdotes[bestQuote]}</p>
      <DisplayVotes votes={votes} selected={bestQuote}/>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  console.log(selected, votes)

  const newQuote = () => {
    const randomNumber = Math.floor(Math.random()*anecdotes.length)
    console.log(randomNumber)
    setSelected(randomNumber)
  }

  const newVote = (current) => {
    const newVotes = {...votes}
    newVotes[current] += 1
    console.log(newVotes)
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Quote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={newQuote}>Get new anecdote</button>
      <DisplayVotes votes={votes} selected={selected}/>
      <button onClick={() => newVote(selected)}>Vote for this one</button>
      <DisplayBest votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App