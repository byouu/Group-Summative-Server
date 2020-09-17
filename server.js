var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var fileUpload = require('express-fileupload')

//Modals
var Clothing = require('./clothing-model')
var Type = require('./type-model')
var User = require('./user-model')
// const { populate } = require('./type-model')

//Express server setup
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(fileUpload())

app.use(express.static('public'))
app.use(logger('dev'))

//Setup database connection
var connectionString = 'mongodb+srv://alteradmin:alterpass@cluster1.hemds.mongodb.net/Stacy?retryWrites=true&w=majority'
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
    .populate('user')
    .then((clothingItems)=>{
        res.json(clothingItems)
    })
})

router.get('/clothingItems/:id', (req, res)=>{
    Clothing.findOne({id:req.params.id})
    .populate('type')
    .populate('user')
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

//Types  CRUD==============================================
router.get('/types', (req,res)=>{
    Type.find()
    .then((type)=>{
        res.json(type)
    })
})

router.get('/types/:id', (req, res)=>{
    Type.findOne({id:req.params.id})
    .populate('clothingItems')
    .then((user)=>{
        res.json(user)
    })
})

router.post('/types', (req, res)=>{
    var type = new Type()
    type.id = Date.now()

    var data = req.body
    console.log(data)
    Object.assign(type, data)
    type.save()
    .then((type)=>{
        res.json(type)
    })
})

router.put('/types/:id', (req, res)=>{
    Type.findOne({id:req.params.id})
    .then((type)=>{
        var data = req.body
        Object.assign(type, data)
        return type.save()
    })
    .then((type)=>{
        res.json(type)
    })
})

router.delete('/types/:id', (req, res)=>{
    Type.deleteOne({id:req.params.id})
    .then(()=>{
        res.json('deleted');
    })
})

//Users CRUD==============================================
router.get('/users', (req,res)=>{
    User.find()
    .then((user)=>{
        res.json(user)
    })
})

router.get('/users/:id', (req, res)=>{
    User.findOne({id:req.params.id})
    .then((user)=>{
        res.json(user)
    })
})

router.post('/users', (req, res)=>{
    var user = new User()
    user.id = Date.now()

    var data = req.body
    console.log(data)
    Object.assign(user, data)
    user.save()
    .then((user)=>{
        res.json(user)
    })
})

router.put('/users/:id', (req, res)=>{
    User.findOne({id:req.params.id})
    .then((user)=>{
        var data = req.body
        Object.assign(user, data)
        return user.save()
    })
    .then((user)=>{
        res.json(user)
    })
})

router.delete('/users/:id', (req, res)=>{
    User.deleteOne({id:req.params.id})
    .then(()=>{
        res.json('deleted');
    })
})

//User authentication =====================================
router.post('/users/authenticate', (req, res)=>{

    var {username, password} = req.body;
    var credential = {username, password}
    User.findOne(credential)
    .then((user)=>{
        return res.json(user)
    })

})

//File Upload =============================================
router.post('/upload', (req, res)=>{
    var files = Object.values(req.files)
    var uploadedFile = files[0]

    var newName = Date.now() + uploadedFile.name

    uploadedFile.mv('public/'+newName, function(){
        res.send(newName)
    })
})

//Serve up routes with server
app.use('/api', router);

//Launch backend into port
const apiPort = 4000;
app.listen(apiPort, ()=> console.log('Listening on port '+apiPort));
