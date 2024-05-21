const express = require('express');
const connection = require('./index')
const app = express()
const {getSightsById} = require('./controllers');
const { customError, newInternalError, badRequest } = require('./error_handling');


connection()

app.get('/api/sights/:sights_id', getSightsById)
app.get('/api/users', getAllUsers)



app.use(badRequest)
app.use(customError)
app.use(newInternalError)


module.exports = app