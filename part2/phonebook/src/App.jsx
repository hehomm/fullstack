import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newName);
    const exists = persons.reduce((prev, current) => prev ? true : current.name===newName, false)
    console.log(exists)
    if (exists) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    if (newName==='') {
      alert('Enter a name')
      return
    }
    const newPerson = {name: newName, number: newNumber}
    console.log(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    console.log(name)
    setNewName(name)
  }

  const handleNumberChange = (event) => {
    const num = event.target.value
    console.log(num)
    setNewNumber(num)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name} >{person.name} {person.number}</div>)}
    </div>
  )
}

export default App