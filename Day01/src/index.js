const express = require("express");
const app = express();
require('dotenv').config();
const main =require('./config/db')
const cookieParser =require('cookie-parser');

//const PORT = process.env.PORT || 3000;

app.use(express.json()); //req.body to js object
app.use(cookieParser());

main()
.then(async ()=>{
    app.listen(PORT, () => {
        console.log("Server listening at port number: " + PORT);
    })
})
.catch(err=> console.log("Error occur" +err))
