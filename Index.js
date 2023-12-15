let express = require('express');
let app = express();
let { routes } = require('./routes.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //if want to accept user
app.use(routes)
app.listen(3001, () => {
    console.log("connected")
})
//server creation