import GalaxyService from "../services/GalaxyService";
import express from 'express'

//import service and create an instance
let _service = new GalaxyService();
let _repo = _service.repository

//public
export default class GalaxyController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllGalaxies)
      .get('/:id', this.getGalaxyById)
      .post('', this.createGalaxy)
      .put('/:id', this.editGalaxy)
      .delete(':id', this.deleteGalaxy)
      .get('/:id/stars', this.getStars)
      .post('/:id/star', this.addStar)
      .delete('/:id/star/:starId', this.deleteStar)
      .use('*', this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such galaxyroute' })
  }

  async getAllGalaxies(req, res, next) {
    try {
      let galaxies = await _repo.find({})
      return res.send(galaxies)
    } catch (error) { next(error) }
  }

  async getGalaxyById(req, res, next) {
    try {
      let galaxy = await _repo.findById(req.params.id)
      return res.send(galaxy)
    } catch (error) { next(error) }
  }

  async createGalaxy(req, res, next) {
    try {
      let galaxy = await _repo.create(req.body)
      return res.status(201).send(galaxy)
    } catch (error) { next(error) }
  }

  async editGalaxy(req, res, next) {
    try {
      let galaxy = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (galaxy) {
        return res.send(galaxy)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteGalaxy(req, res, next) {
    try {
      let galaxy = await _repo.findByIdAndDelete(req.params.id)
      return res.send('successfully deleted')
    } catch (error) { next(error) }
  }

  async getStars(req, res, next) {
    try {
      let galaxy = await _repo.findById(req.params.id).populate('stars')
      return res.send(galaxy)
    } catch (error) { next(error) }
  }

  async addStar(req, res, next) {
    try {
      let galaxy = await _repo.findById(req.params.id)
      let starId = req.body.starId
      galaxy.stars.push(starId)
      galaxy.save(err => {
        if (err) {
          return next(err)
        }
        return res.send(galaxy)
      })
    } catch (error) { next(error) }
  }

  async deleteStar(req, res, next) {
    try {
      let starId = req.body.starId
      let galaxy = await _repo.findByIdAndDelete(starId)
      galaxy.save(err => {
        if (err) {
          return next(err)
        }
        return res.send("successfully deleted")
      })
    } catch (error) { next(error) }
  }
}