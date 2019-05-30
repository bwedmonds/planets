import express from 'express'
import './db/dbconfig'
let port = 3000
let server = express()
let bp = require('body-parser')

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())

//everything above this line will ALWAYS stay

//  import the route Controller
import GalaxyController from './controllers/GalaxyController'

//  register the route
server.use('/api/users', new GalaxyController().router)



//BELOW THIS LINE STAYS THE SAME

//Default Error Handler
server.use((err, req, res, next) => {
  res.status(err.status || 400).send({ err: { message: err.message } })
})

server.listen(port, () => { console.log("Your server is running on port 3000.") })