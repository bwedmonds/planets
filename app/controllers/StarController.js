import StarService from "../services/StarService";
import express from 'express'
// @ts-ignore
import PlanetService from "../services/PlanetService"

//import service and create an instance
let _service = new StarService();
let _repo = _service.repository


//public
export default class StarController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllStars)
      .get('/:id', this.getStarById)
      .post('', this.createStar)
      .put('/:id', this.editStar)
      .delete(':id', this.deleteStar)
      .get('/:id/galaxies', this.getGalaxies)
      .get('/:id/planets', this.getPlanets)
      .post('/:id/planet', this.addPlanet)
      .delete('/:id/star/:planetId', this.deletePlanet)
      .use('*', this.defaultRoute)
  }

  // @ts-ignore
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such Star route' })
  }

  // @ts-ignore
  async getAllStars(req, res, next) {
    try {
      let stars = await _repo.find({})
      return res.send(stars)
    } catch (error) { next(error) }
  }

  async getStarById(req, res, next) {
    try {
      let star = await _repo.findById(req.params.id)
      return res.send(star)
    } catch (error) { next(error) }
  }

  async createStar(req, res, next) {
    try {
      let star = await _repo.create(req.body)
      return res.status(201).send(star)
    } catch (error) { next(error) }
  }

  async editStar(req, res, next) {
    try {
      let star = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (star) {
        return res.send(star)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteStar(req, res, next) {
    try {
      // @ts-ignore
      let star = await _repo.findByIdAndDelete(req.params.id)
      return res.send('successfully deleted')
    } catch (error) { next(error) }
  }

  async getGalaxies(req, res, next) {
    try {
      let galaxy = await _repo.findById(req.params.id).populate('galaxies')
      return res.send(galaxy)
    } catch (error) { next(error) }
  }

  async getPlanets(req, res, next) {
    try {
      let planet = await _repo.findById(req.params.id).populate('planets')
      return res.send(planet)
    } catch (error) { next(error) }
  }

  async addPlanet(req, res, next) {
    try {
      let planet = await _repo.findById(req.params.id)
      let planetId = req.body.planetId
      planet.stars.push(planetId)
      planet.save(err => {
        if (err) {
          return next(err)
        }
        return res.send(planet)
      })
    } catch (error) { next(error) }
  }

  async deletePlanet(req, res, next) {
    try {
      let planetId = req.body.starId
      let planet = await _repo.findByIdAndDelete(planetId)
      planet.save(err => {
        if (err) {
          return next(err)
        }
        return res.send("successfully deleted")
      })
    } catch (error) { next(error) }
  }
}