import COURSES_DATA from "../data/data.js"
import createCourseTemplate from "./course.js"


const createListTemplate = () => /*html*/`
    <ul>
    ${COURSES_DATA.map((course) => createCourseTemplate(course)).join('') } 
    </ul>
`

export default createListTemplate