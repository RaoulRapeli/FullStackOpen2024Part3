const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())

morgan.token('body', function getBody (req) {
    return JSON.stringify(req.body)
  })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

let persons = [
    {
        "number": "040-123456",
        "name": "Arto Hellas",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.put('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.map(person => person.id !== id ? person : request.body)
    response.json(request.body)
})

const generateId = () => {
    return Math.random() * (100000 - persons.length) + persons.length   
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }
    let ifExistingPerson = persons.find((person) => person.name === body.name)
    if(ifExistingPerson !== undefined){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
})

app.get('/info', (request, response) => {
    response.send(
        `<div>Phonebook has info for ${persons.length}</div>`+
        `</br>`+
        `<div>${Date()}</div>`
    )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})