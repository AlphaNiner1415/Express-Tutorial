const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.json({ name: "Anon" }))

app.listen(port, () => console.log(`Your website is ready to go baby!! On port ${port}!`))
