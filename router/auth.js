const router = require('express').Router()
const User=  require('../Model/User')

// Get All Request
router.get('/', async (req, res) => {
    await User.find((err, data) => {
        if(err) res.status(500).send(err)
        else res.status(200).json(data)
    })
})

//Post Request
router.post('/', async (req, res) => {
    const user= new User(req.body)
    await user.save((err, data) => {
        if(err) res.status(500).send(err)
        else res.status(201).json(data)
    })
})

// Update Request using patch
router.patch('/:id', async (req, res) => {
    await User.findOneAndUpdate({_id: req.params.id}, req.body, (err, data) => {
        if(err) res.status(500).send(err)
        else res.status(200).json(data)
    })
})

//Delete Request
router.delete('/:id', async (req, res) => {
    await User.findOneAndDelete({_id: req.params.id}, (err, data) => {
        if(err) res.status(500).send(err)
        else res.status(200).json(data)
    })
})

module.exports = router