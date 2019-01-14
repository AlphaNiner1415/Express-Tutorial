const express = require('express')
const app = express()
const port = 3000

app.get('/',(req, res) => res.json({lastName: "Durongpisitkul",studentId: "6131898121",firstName: "Anon"
}))

app.get('/home', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Your website is ready to go baby!! On port ${port}!`))
