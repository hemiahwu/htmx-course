const createHomepageTemplate = () => /*html*/ `

<!DOCTYPE html>
<html>

<head>
  <title>课程列表</title>
  <script src="https://unpkg.com/htmx.org@2.0.1"></script>
  <link rel="stylesheet" href="/styles.css">
</head>

<body>
  <header>
    <h1>课程列表</h1>
  </header>

  <main>
    <div class="search" style="text-align: center;">
      <input type="search" name="search" placeholder="搜索课程" hx-post="/courses/search"
        hx-trigger="keyup changed delay:300ms" hx-target=".course-list" />
    </div>

    <div class="course-list">
      <button hx-get="/courses"  hx-target=".course-list">显示课程</button>
    </div>

    <div class="add-course-form">
      <h2>你需要什么课程?</h2>
      <form>
        <input id="title" name="title" placeholder="课程标题" type="text" required />
        <input id="author" name="author" placeholder="作者" type="text" required />
        <button hx-on::after-request="document.querySelector('form').reset()" hx-on:click="console.log('新课已添加',event)" hx-post="/courses" hx-target=".course-list ul" hx-swap="beforeend">添加</button>
      </form>
    </div>
  </main>
</body>

</html>
`;

export default createHomepageTemplate;
