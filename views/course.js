const createCourseTemplate = (course) => /*html*/ `
<li data-id="${course.id}">
    <div class="details">
        <h3>${course.title}</h3>
        <p>${course.author}</p>
    </div>
    <button>删除</button>
</li>
`

export default createCourseTemplate