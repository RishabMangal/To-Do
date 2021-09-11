var express = require('express')
var todoController = require('./controllers/todoController')
var app = express()
var path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(express.static('views'))

todoController(app)

const PORT = process.env.PORT || 3000

// var code="<button onclick=\"console.log('Fuck yeah!!');req.url=res.url+'/todo';\">Click Me</button>"
var code =
  "<link rel='stylesheet' type='text/css' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'/><body class='bg-dark'><h1 class='display-4 p-3 text-secondary text-center text-capitalize font-italic font-weight-bold'>welcome</h1><a href='/todo'><button class='btn btn-primary m-3'>To-Do App</button></a> <div class='mr-auto container-fluid fixed-bottom ' style='background-color:black'><p class='text-center px-3 mr-auto text-secondary'>Thank You for Visiting</p><p class='text-secondary text-right px-3 mr-auto'>Developed by- Rishab Mangal'</p><p class='text-secondary text-right text-weight-light px-3 mr-auto'>Version 1.0.0</p></div></body>"
app.get('/', function (req, res) {
  // res.send("Go to localhost:3000/todo");
  // req.url=res.url+"/todo";.
  res.writeHead(200, { 'Content-Type': 'text/html' })
  // ;.
  res.end(code)
})

app.listen(PORT, () => console.log('Go to port ' + PORT))
