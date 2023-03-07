const connectToMongo = require('./db')

connectToMongo();

const express = require('express')
const app = express()
const port = 3000


// Available Routes
app.use('/api/auth',require('./routes/auth.js'))  // app.use kar k routes ko link karenge   
app.use('/api/auth',require('./routes/notes.js'))  // app.use kar k routes ko link karenge   

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})