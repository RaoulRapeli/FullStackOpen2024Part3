const express = require('express')
const app = express()

let persons = [
    {
        "number": "040-123456",
        "name": "Arto Hellas",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
      }
]

app.get('/api/persons', (request, response) => {
    response.end(JSON.stringify(persons))
})

app.get('/info', (request, response) => {
    response.send(
        `<div>Phonebook has info for ${persons.length}</div>`+
        `</br>`+
        `<div>${Date()}</div>`
    )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})