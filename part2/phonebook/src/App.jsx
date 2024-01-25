import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newName);
    const exists = persons.reduce((prev, current) => prev ? true : current.name===newName, false)
    console.log(exists)
    if (exists) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPerson = {name: newName}
    console.log(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleChange = (event) => {
    const name = event.target.value
    console.log(name)
    setNewName(name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App