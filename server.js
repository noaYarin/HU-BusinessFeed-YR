const express = require("express")
app = express()
  mongoose = require("mongoose"),
  port = 3000;

// app.get("/", (req, res) => {
//   return res.json({ hello: "world" })
// })

mongoose
 .connect("mongodb://0.0.0.0:27017").then(()=>{
    app.listen(port, ()=>{console.info(`start server start listening on port http://localhost:${port}`)})
}).catch(err=>console.error(err))