// Const = constant: a thing whose value can't be changed
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
const port = 3000;

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

//Model
const Announcement = sequelize.define('announcement', { //Date is handled by sequelize
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.STRING
  }
});



// force: true is Force syncing will destroy all previous data and insert in new data.
//This means you run this only once to initialize the database and comment it out after that.

Announcement.sync({force: true}).then(() => {
  console.log("Announcement table created.")
  });


//app.use means we're going to use whatever's inside the parentheses.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//Get is user pull data from the server
/* In one address ('/') there can only be one instance of each res.xxxx() function For example
one res.json() per address*/

app.get('/', (req, res) => res.json({ name: "Anon" }))


//Testing connection
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
  });
})


//Post is user sent information to server
// => is the equivalent of typing "function"
//req is for request you can actually put anything inside it as long as you're consistent.
app.post('/create-announcement', (req, res) => {
  let title = req.body.title //The title in code = title in key received from the body
  let body = req.body.body
  Announcement.create({
    title: title, //Title of database = title of the one we're using in the code.
    body: body
  }).then(() => {
    res.json({ status: "Success!" });
  }).catch(e => {
    res.json({status: "Error."});
  });
});

app.get('/all-announcement', (req, res) => {
  Announcement.findAll().then(a => { // all the data will be stored in a
  console.log(a)
  res.json({ status: "Success!" , data: a})
  }).catch(e => {
    res.json({status: "Error."})
  })
})

app.get('/:page', (req, res) => {
  let limit = 10;   // number of records per page
  let offset = 0;
  db.Announcement.findAndCountAll()
  .then((data) => {
    let page = req.params.page;      // page number
    let pages = Math.ceil(data.count / limit);
		offset = limit * (page - 1);
    db.Announcement.findAll({
      attributes: ['id', 'title','body' ],
      limit: limit,
      offset: offset,
      $sort: { id: 1 }
    })
    .then((Announcement) => {
      res.status(200).json({'result': Announcement, 'count': data.count, 'pages': pages});
    });
  })
  .catch(function (error) {
		res.status(500).send('Internal Server Error');
	});
});


app.listen(port, () => console.log(`Your website is ready to go baby!! On port ${port}!`))

//HOmework create Data with all the values discussed.
