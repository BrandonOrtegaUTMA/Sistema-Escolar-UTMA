const cors = require("cors");
const express = require('express');
const {json, urlencoded} = require('express');
const logger = require('morgan');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Data base connected")
})
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(logger('dev'));
app.use(cors(corsOptions))
app.use(json({limit: '50mb'}));
app.use(urlencoded({limit: '50mb', extended: true }));

app.use("/api",require('./src/routes/index'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, function () {
    console.log(`Aplicacion corriendo en el puerto ${process.env.PORT}`);
});