//Felhasznált eszközök ,,importja"
const express = require('express'),
  path = require('path'),
  mongo = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const app = express();

mongo.Promise = global.Promise;

//MongoDB collection létrehozás/csatlakozás a megadott névvel
mongo.connect('mongodb://localhost:27017/DB2Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Successful connection.')
  },
  error => {
    console.log('Failed to connect to database: ' + error)
  }
)

const Schema = mongo.Schema;

//Munkavállaló séma létrehozása az adatbázisban
const employeeRoute = express.Router();
let Employee = new Schema({
  name: {
    type: String
  },
  position: {
    type: String
  },
  idCard: {
    type: String
  },
  salary: {
    type: Number
  }
}, {
  collection: 'employees'
});

var employeeModel = mongo.model('employees', Employee, 'employees');

//Új munkavállaló létrehozása a create() metódussal + útvonal megadása
employeeRoute.route('/addEmployee').post((req, res, next) => {
  employeeModel.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

//Összes munkavállaló lekérdezése a find() metódus segítségével + útvonal megadása
employeeRoute.route('/getEmployee').get((req, res) => {
  employeeModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Felhasználók (regisztráció) séma létrehozása az adatbázisban
const userRoute = express.Router();
let User = new Schema({
  uname: {
    type: String
  },
  password: {
    type: String
  }
}, {
  collection: 'users'
})

var userModel = mongo.model('users', User, 'users');

//Új felhasználó létrehozása a create() metódussal + útvonal megadása
userRoute.route('/addUser').post((req, res, next) => {
  userModel.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

//Összes felhasználó lekérdezése a find() metódus segítségével + útvonal megadása
userRoute.route('/getallUser').get((req, res) => {
  userModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Adott felhasználó kiválasztása a megadott ID alapján + útvonal megadása
userRoute.route('/getUser/:id').get((req, res) => {
  userModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/assignment')));
app.use('/', express.static(path.join(__dirname, 'dist/assignment')));

app.use('', userRoute)
app.use('', employeeRoute)

app.listen(8080);
console.log('Database server port: 8080');
