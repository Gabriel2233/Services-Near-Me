const express = require('express')
const router = express.Router()
const Service = require('../Models/Service')

router.get('/', async (req, res) => {
     try {
        const Services = await Service.find()
        res.json(Services)
     } catch {
         res.json({ message: 'Error'})
     }
})

router.get('/:id', async (req, res) => {
    try {
        const searchedService = await Service.findById({ _id : req.params.id })
        res.json(searchedService)
    } catch {
        res.json({ message: 'Error' })
    }
})

router.get('/:uf/:city', async (req, res) => {
   try {

       const { uf, city } = req.params

       const filteredServices = await Service.find({ uf, city })
       
       res.json(filteredServices)

   } catch {

    res.json({ message: 'Error' })

   }
 })

 
router.post('/', async (req, res) => {
 
    const { name, uf, city, serviceType, latitude, longitude, opensAt, closesAt } = req.body

    const savedService = new Service({
        name,
        uf,
        city,
        serviceType,
        latitude,
        longitude,
        opensAt,
        closesAt
    })

    try {
        const newService = await savedService.save()
        res.json(newService)
    } catch(err) {
        res.json({ message: 'Error'})
    }
  
})

module.exports = router
