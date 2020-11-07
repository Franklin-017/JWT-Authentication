const router = require('express').Router()
const bcrypt = require('bcrypt')
const createError = require('http-errors')

const User=  require('../Model/User')

// Get All Request
router.get('/', async (req, res) => {
    await User.find((err, data) => {
        if(err) res.status(500).send(err)
        else res.status(200).json(data)
    })
})

//Login Post Request
router.post('/login',  async (req, res) => {

    const { name, email, password} = req.body

    if(!email || !password || !name) throw createError.BadRequest()

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    
    const doesEmailExist = await User.findOne({email})
    if(doesEmailExist) throw createError.Conflict(`${email} is already been registered`)

    const user= new User({
        name: name,
        email: email,
        password: hash
    })
    await user.save((err, data) => {
        if(err) res.status(500).send(err)
        else res.status(201).json(data)
    })
})


//Post Request
router.post('/register', async (req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({email})

    const verifyPassword = bcrypt.compareSync(password, user.password)

    if(!verifyPassword){
        res.send('Invalid Criteria')
    } 
    else {
        res.send("You are Logged In")
    }
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