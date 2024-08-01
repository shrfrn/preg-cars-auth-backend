import express from 'express'
import { addCar, getCar, getCars, removeCar, updateCar } from './car.controller.js'

const router = express.Router()

router.get('/', getCars)
router.get('/:carId', getCar)
router.delete('/:carId', removeCar)
router.post('/', addCar)
router.put('/', updateCar)


export const carRoutes = router