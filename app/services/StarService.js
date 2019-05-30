import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId

let _schema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  earthDistance: { type: Number, required: true },
  age: { type: Number },
  galaxies: [{ type: ObjectId, ref: 'galaxy' }],
  planets: [{ type: ObjectId, ref: 'planet' }]
})

export default class StarService {
  get repository() {
    return mongoose.model('star', _schema)
  }
}