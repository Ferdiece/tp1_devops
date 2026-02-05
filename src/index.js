const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const fs = require('fs')
const path = require('path')

const swaggerUi = require('swagger-ui-express')

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

const swaggerPath = path.join(__dirname, 'swagger.json')
if (process.env.NODE_ENV !== 'test' && fs.existsSync(swaggerPath)) {
  const swaggerDocument = require('./swagger.json')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}


app.use('/user', userRouter)

const db = require('./dbClient')
db.on('error', (err) => {
  console.error(err)
})

if (require.main === module) {
  app.listen(PORT, (err) => {
    if (err) throw err
    console.log('Server listening on port ' + PORT)
  })
}

module.exports = app
