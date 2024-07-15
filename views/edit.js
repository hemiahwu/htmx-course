const createEditFormTemplate = (course) => /*html*/ `
<form hx-put="/courses/${course.id}" hx-target="closest li" hx-swap="outerHTML">
    <input id="title" name="title" placeholder="课程标题" type="text" value="${course.title}" />
    <input id="author" name="author" placeholder="作者" type="text" value="${course.author}" />
    <button>添加</button>
</form>

`

export default createEditFormTemplate