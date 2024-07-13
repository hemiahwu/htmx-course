## 第三课 HTMX搭建后台结构

### 一. 下载Node.js环境

*  [Node.js官网网址](https://nodejs.org/en)

### 二. 搭建后台结构

* npm init -y
* npm install express
* sudo npm i nodemon -g
* 根路径创建app.js文件

`````js
import express from 'express';

// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.send("hello HTMX!");
});

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
`````

* 根路径创建public文件夹
* public文件夹下创建styles.css

`````css
body {
  padding: 20px;
  font-family: "Rubik", sans-serif;
  color: #333;
  background-color: #f0f2f5;
  line-height: 1.6;
  margin: 0;
}

main {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  box-sizing: border-box;
}

h1, h2, h3, header {
  text-align: center;
  color: #2c3e50;
}

header {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e9e9e9;
}

.course-list > button {
  width: 100%;
  margin: 20px auto;
  display: block;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.course-list > button:hover {
  background-color: #2980b9;
}

.course-list ul {
  padding: 0;
  list-style-type: none;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.course-list li {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-list li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.course-list li > div {
  margin-right: auto;
}

.course-list li h3, .course-list li p {
  text-align: left;
  margin-bottom: 5px;
  margin-top: 0;
  word-break: break-word;
}

.course-list li h3 {
  font-size: 18px;
  color: #2c3e50;
}

.course-list li p {
  color: #7f8c8d;
  font-size: 14px;
}

input, button {
  padding: 12px;
  font-family: "Rubik", sans-serif;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
}

form input {
  flex: 1 0 200px;
  min-width: 0;
  border: 1px solid #e9e9e9;
}

form button {
  flex: 0 0 auto;
  background-color: #2ecc71;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #27ae60;
}

.add-course-form {
  margin-top: 60px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

button {
  background: #ef4444;
  color: white;
  border: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #dc2626;
}

@media (max-width: 600px) {
  main {
    padding: 20px;
  }
  
  form {
    flex-direction: column;
  }
  
  form input, form button {
    width: 100%;
  }
}
`````

* 根路径创建views文件夹
* views文件夹下创建index.js文件

`````js
const createHomepageTemplate = () => /*html*/`
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
          <input 
            type="search"
            name="search"
            placeholder="搜索课程"
            hx-post="/courses/search"
            hx-trigger="keyup changed delay:300ms"
            hx-target=".course-list"
          />
        </div> 

        <div class="course-list">
          <button hx-get="/courses" hx-target=".course-list">显示课程</button>
        </div>

        <div class="add-course-form">
          <h2>你需要什么课程?</h2>
          <form
            hx-post="/courses" 
            hx-target=".course-list ul" 
            hx-swap="beforeend" 
            hx-on::after-request="document.querySelector('form').reset()"
          >
            <input 
              id="title" 
              name="title"
              placeholder="课程标题" 
              type="text"
              required 
            />
            <input 
              id="author" 
              name="author"
              placeholder="作者" 
              type="text"
              required
            />
            <button>添加</button>
          </form>
        </div>
      </main>
    </body>
  </html>
`;

export default createHomepageTemplate;
`````

* app.js

`````js
import createHomepageTemplate from './views/index.js'

app.get('/', (req, res) => {
  res.send(createHomepageTemplate());
});
`````

* 根路径创建data文件夹
* data文件夹下创建data.js

`````js
const COURSES_DATA = [
  {id: "1", title: 'HTMX快速学习指南', author: '米斯特吴'},
  {id: '2', title: 'Node.js快速学习指南', author: '吴海洋'},
];

export default COURSES_DATA;
`````

* 启动项目

`````bash
nodemon app.js
`````





















