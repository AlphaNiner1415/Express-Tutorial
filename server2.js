const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
const port = 3001;

const sequelize = new Sequelize('randomdb', '', '', { //first parentheses is the database.
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },

  lastName: {
    type: Sequelize.STRING
  },

  gender: {
    type: Sequelize.ENUM('M','F','O')
  },

  birthday: {
    type: Sequelize.DATEONLY
  },

  username: {
    type: Sequelize.STRING
  },

  password: {
    type: Sequelize.STRING
  },

  underlyingDisease: {
    type: Sequelize.TEXT
  },

  drugAllergy: {
    type: Sequelize.TEXT
  },

  citizenId: {
    type: Sequelize.STRING
  },

  bloodType: {
    type: Sequelize.ENUM('O','A','B','AB')
  }

});

// User.sync({force: true}).then(() => {
//   console.log("User table created.")
//   });

//app.use means we're going to use whatever's inside the parentheses.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ name: "Anon" }))

app.get('/test',(req,res) => {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    res.json({ status: 'Connection has been established successfully.' })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    res.json({ status: 'Unable to connect to the database.' })
  })
})

app.post('/create-user', (req, res) => {
  let firstName = req.body.firstName //The title in code = title in key received from the body
  let lastName = req.body.lastName
  let gender = req.body.gender
  let birthday = req.body.birthday
  let username = req.body.username
  let password = req.body.password
  let underlyingDisease = req.body.underlyingDisease
  let drugAllergy = req.body.drugAllergy
  let citizenId = req.body.citizenId
  let bloodType = req.body.bloodType

  User.create({
    firstName: firstName, //Title of database = title of the one we're using in the code.
    lastName: lastName,
    gender: gender,
    birthday: birthday,
    username: username,
    password: password,
    underlyingDisease: underlyingDisease,
    drugAllergy: drugAllergy,
    citizenId: citizenId,
    bloodType: bloodType
  }).then(() => {
    res.json({ status: "Success!" })
  }).catch(e => {
    res.json({status: "Error."})
  })
})

app.get('/all-user', (req, res) => {
  User.findAll().then(a => { // all the data will be stored in a
  console.log(a)
  res.json({ status: "Success!" , data: a})
  }).catch(e => {
    res.json({status: "Error."})
  })
});

app.listen(port, () => console.log(`Your website is ready to go baby!! On port ${port}!`))
