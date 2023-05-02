const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const eventRoute = require('./routes/route')
const app = express();

mongoose.connect('mongodb+srv://moizlarjiml:test123123@mongapi.lw4qzcb.mongodb.net/?retryWrites=true&w=majority')


mongoose.connection.on('error', err => {
  console.log('Connection Failed.')
})

mongoose.connection.on('connected', connected => {
  console.log('Connected to database successfully.')
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api/v3/app',eventRoute)

app.listen(port, () => console.log(`Server running on port ${port}`));
