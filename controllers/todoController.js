// var todos = [
//   { item: "Spread Happiness" },
//   { item: "Be Happy" },
//   { item: "Help Somebody" },
//   { item: "Make Someone Smile" },
//   { item: "DO WHATS BEST" },
//   { item: "Get Milk" },
//   { item: "Code" },
//   { item: "Eat" },
//   { item: "Repeat" }
// ];

var bodyParser = require('body-parser')

var urlencoded = bodyParser.urlencoded({ extended: false })

// var mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://test:test@todo-eeqvt.mongodb.net/test?retryWrites=true&w=majority");

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://test:test@todo-gizyq.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// var todoSchema = new mongoose.Schema({
//     item: String
// });

// var Todo = mongoose.model("Todo", todoSchema);

// var itemOne = Todo({ item: "Buy Flowers" }).save(function (err) {
//     if (err) throw err;
//     console.log(err);
//     console.log("Item Saved To DB");
// });

var MongoClient = require('mongodb').MongoClient
// var url ="mongodb+srv://todo:test@todo-gizyq.mongodb.net/test?retryWrites=true&w=majority";
var url =
  'mongodb+srv://rishabmangal1:Mangal@1999@backmeup.zyrtp.mongodb.net/todo?retryWrites=true&w=majority'

MongoClient.connect(url, function (err, db) {
  if (err) throw err
  var dbo = db.db('todo')
  //   var myobj = { item: "Yipee I am Added" };
  //   var myobj2 = { item: "Yipee I am Added again" };
  //   dbo.collection("todo-list").insertMany(todos, function(err, res) {
  //     if (err) throw err;
  //     console.log("1 document inserted"+res.insertedCount);
  //     db.close();
  //   });
  dbo
    .collection('todo-list')
    .find({})
    .toArray(function (err, res) {
      if (err) throw err
      console.log('List of All Items:')
      console.log(res)
      console.log('----------------------------------')
      db.close()
    })
  // db.close();
})

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("todo");
//   var myquery = { item: "Repeat" };
//   dbo.collection("todo-list").deleteMany(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log(obj.result.n + " document(s) deleted");
//     db.close();
//   });
// });

module.exports = function (app) {
  app.get('/todo', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db('todo')
      dbo
        .collection('todo-list')
        .find({})
        .toArray(function (err, result) {
          if (err) throw err
          console.log(result)
          res.render('todo', { todos: result })
          db.close()
        })
      // db.close();
    })
  })

  app.post('/todo', urlencoded, function (req, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db('todo')
      dbo.collection('todo-list').insertOne(req.body, function (err, res) {
        if (err) throw err
        console.log('Your Item Added to DB')
        console.log(req.body)
        db.close()
      })
      dbo
        .collection('todo-list')
        .find({})
        .toArray(function (err, result) {
          if (err) throw err
          console.log('Data Sended to Json')
          res.json(result)
          db.close()
        })
    })
    // todos.push(req.body);
    // res.json(todos);
  })

  app.delete('/todo/:item', function (req, res) {
    // todos = todos.filter(function(todo){
    //     return todo.item.replace(/ /g,'-') !== req.params.item;
    // });
    console.log(req.params.item)
    // todos = todos.filter(x => {
    //   return x.item !== req.params.item;
    // });
    // res.json(todos);
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db('todo')
      var myquery = { item: req.params.item }
      dbo.collection('todo-list').deleteOne(myquery, function (err, result) {
        if (err) throw err
        console.log('One Item Deleted ' + req.params.item)
        db.close()
      })
    })

    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db('todo')
      dbo
        .collection('todo-list')
        .find({})
        .toArray(function (err, result) {
          if (err) throw err
          console.log('Deleted Item And Data Sent to Json')
          res.json(result)
          db.close()
        })
    })
  })
}
