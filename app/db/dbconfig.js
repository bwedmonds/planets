//THIS FILE STAYS BASICALLY THE SAME
import mongoose, { connect } from 'mongoose'

//THIS STRING WILL CHANGE SLIGHTLY
const connectionString = "mongodb+srv://bedmonds:mongomongo1!@cluster0-ppdpi.mongodb.net/planets?retryWrites=true"

let connection = mongoose.connection

mongoose.connect(connectionString, {
  useNewUrlParser: true
})

//log any errors
connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

//confirm connection
connection.once('open', () => {
  console.log('connected to the database')
})