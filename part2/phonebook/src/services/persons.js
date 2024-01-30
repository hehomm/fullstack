import axios from 'axios'
const url = 'http://localhost:3001/persons'

const addPerson = newPerson => {
    return (
        axios
            .post(url, newPerson)
            .then(response => response.data)
    )
}

export default {addPerson}