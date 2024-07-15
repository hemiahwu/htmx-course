const createCourseTemplate = (course) => /*html*/ `
<li data-id="${course.id}">
    <div 
        class="details"
        hx-get="/course/edit/${course.id}"
        hx-target="closest li"
    >
        <h3>${course.title}</h3>
        <p>${course.author}</p>
    </div>
    <button hx-delete="/courses/${course.id}" hx-target="closest li" hx-swap="outerHTML">删除</button>
</li>
`

export default createCourseTemplate