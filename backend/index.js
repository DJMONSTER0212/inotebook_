const connectToMongo = require('./db')

connectToMongo();


const express = require('express')
const app = express()
const port = 5000
// agar aap log use karna chahte ho req.body ko toh aapko ek middleware use karna padega
app.use(express.json())


// Available Routes
app.use('/api/auth',require('./routes/auth.js'))  // app.use kar k routes ko link karenge   
app.use('/api/notes',require('./routes/notes.js'))  // app.use kar k routes ko link karenge   

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})