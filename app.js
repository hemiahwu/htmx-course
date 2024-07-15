import express from 'express'
import createHomepageTemplate from './views/index.js'
import createListTemplate from './views/list.js'

import createCourseTemplate from './views/course.js'
import createEditFormTemplate from './views/edit.js'

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
    res.send(createCourseTemplate({id,title,author}))
})

app.delete("/courses/:id",(req,res) => {
    const idx = COURSES_DATA.findIndex(c => c.id === req.params.id)
    COURSES_DATA.splice(idx,1)
    res.send()
})

app.get("/course/edit/:id",(req,res) => {
    const course = COURSES_DATA.find(c => c.id === req.params.id)
    res.send(createEditFormTemplate(course))
})

app.put("/courses/:id",(req,res) => {
    const {title,author} = req.body
    const id = req.params
    const newCourse = {id,title,author}
    const idx = COURSES_DATA.findIndex(c => c.id === id)
    COURSES_DATA[idx] = newCourse
    res.send(createCourseTemplate(newCourse))
})




// listen to port
app.listen(3000,() => {
    console.log("App listening on port 3000")
})