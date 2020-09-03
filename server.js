var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

//Modals
var Clothing = require('./clothing-model')

//Express server setup
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

//Setup database connection
var connectionString = 'mongodb+srv://alteradmin:alterpass@cluster1.hemds.mongodb.net/Alter?retryWrites=true&w=majority'
mongoose.connect(connectionString, {useNewUrlParser:true})
var db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'))

//Setup routes
var router = express.Router();

router.get('/testing', (req, res)=>{
    res.send('<h1>Testing</h1>')
})

//CRUD clothing

//Clothing Items CRUD==============================================
router.get('/clothingItems', (req,res)=>{
    Clothing.find()
    .populate('type')
    .then((clothingItems)=>{
        res.json(clothingItems)
    })
})

router.get('/clothingItems/:id', (req, res)=>{
    Clothing.findOne({id:req.params.id})
    .then((project)=>{
        res.json(project)
    })
})

router.post('/clothingItems', (req, res)=>{
    var clothingItem = new Clothing()
    clothingItem.id = Date.now()

    var data = req.body
    console.log(data)
    Object.assign(clothingItem, data)
    clothingItem.save()
    .then((clothingItem)=>{
        res.json(clothingItem)
    })
})

router.put('/clothingItems/:id', (req, res)=>{
    Clothing.findOne({id:req.params.id})
    .then((clothingItem)=>{
        var data = req.body
        Object.assign(clothingItem, data)
        return clothingItem.save()
    })
    .then((clothingItem)=>{
        res.json(clothingItem)
    })
})

router.delete('/clothingItems/:id', (req, res)=>{
    Clothing.deleteOne({id:req.params.id})
    .then(()=>{
        res.json('deleted');
    })
})

//Serve up routes with server
app.use('/api', router);

//Launch backend into port
const apiPort = 4000;;
app.listen(apiPort, ()=> console.log('Listening on port '+apiPort));
