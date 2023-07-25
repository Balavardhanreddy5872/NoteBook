const connection= require('./db')
connection;

const express = require('express')
const app = express()
const port = 5000
app.use(express.json())

// Avaliable routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/note', require('./routes/note'))


app.get('/', (req, res) => {
  res.send('Hello Balavardhan')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
