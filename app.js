import express from 'express'
import createHomepageTemplate from './views/index.js'
import createListTemplate from './views/list.js'
import COURSES_DATA from './data/data.js'
import createCourseTemplate from './views/course.js'


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
    res.send(createCourseTemplate({id,title,author}))
})

app.delete("/courses/:id",(req,res) => {
    const idx = COURSES_DATA.findIndex(c => c.id === req.params.id)
    COURSES_DATA.splice(idx,1)
    res.send()
})


// listen to port
app.listen(3000,() => {
    console.log("App listening on port 3000")
})