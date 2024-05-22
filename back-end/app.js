const express = require('express');
const connection = require('./index')
const app = express()
const {getSightsById, getAllUsers, getUserById, postNewUser, patchUser} = require('./controllers');
const { customError, newInternalError, badRequest } = require('./error_handling');


connection()
app.use(express.json())

app.get('/api/sights/:sights_id', getSightsById)
app.get('/api/users', getAllUsers)
app.get('/api/users/:username', getUserById)
app.post('/api/users', postNewUser)
app.patch('/api/users/:username', patchUser)

app.all('*', (req, res, next) => {res.status(404).send({msg: 'route does not exist'})})

app.use(badRequest)
app.use(customError)
app.use(newInternalError)


module.exports = app