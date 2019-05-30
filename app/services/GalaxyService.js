import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  earthDistance: { type: Number, required: true },
  stars: []
})

export default class GalaxyService {
  get repository() {
    return mongoose.model('galaxy', _schema)
  }
}