import express from 'express'
import createHomepageTemplate from './views/index.js'
import createListTemplate from './views/list.js'
import COURSES_DATA from './data/data.js'




// create app
const app = express()
app.use(express.urlencoded({extended: false}))

// static asstes
app.use(express.static("public"))

// routes
app.get("/",(req,res) => {
    res.send(createHomepageTemplate())
})

app.get("/courses",(req,res) => {
    res.send(createListTemplate())
})

app.post("/courses",(req,res) => {
    const {title,author} = req.body
    const id = Math.random().toString()
    COURSES_DATA.push({id,title,author})
    res.send(`<li>${title},${author}</li>`)
})


// listen to port
app.listen(3000,() => {
    console.log("App listening on port 3000")
})