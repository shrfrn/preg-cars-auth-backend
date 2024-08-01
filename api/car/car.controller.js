import { carService } from './car.service.js'

// Car CRUDL API

export async function getCars(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || '',
            minSpeed: +req.query.minSpeed || 0,
            pageIdx: req.query.pageIdx || undefined
        }
        const cars = await carService.query(filterBy)
        res.send(cars)
    } catch (err) {
        res.status(400).send(`Couldn't get cars`)
    }
}

export async function getCar(req, res) {
    const { carId } = req.params
    const lastCarId = req.cookies.lastCarId

    try {
        if (lastCarId === carId) return res.status(400).send('Please wait a bit')
        const car = await carService.getById(carId)
        res.cookie('lastCarId', carId, { maxAge: 5 * 1000 })
        res.send(car)
    } catch (err) {
        res.status(400).send(`Couldn't get car`)
    }
}


export async function removeCar(req, res) {
    const { carId } = req.params

    try {
        await carService.remove(carId)
        res.send('Deleted OK')
    } catch (err) {
        res.status(400).send(`Couldn't remove car : ${err}`)
    }
}


export async function addCar(req, res) {
    const { vendor, speed } = req.body
    const carToSave = { vendor, speed: +speed }

    try {
        const savedCar = await carService.save(carToSave)
        res.send(savedCar)
    } catch (err) {
        res.status(400).send(`Couldn't save car`)
    }
}

export async function updateCar(req, res) {
    const { _id, vendor, speed } = req.body
    const carToSave = { _id, vendor, speed: +speed }

    try {
        const savedCar = await carService.save(carToSave)
        res.send(savedCar)
    } catch (err) {
        res.status(400).send(`Couldn't save car`)
    }
}