const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var todos = [
    {'id':1,'title':'eat'},
    {'id':2,'title':'drink'},
    {'id':3,'title':'play'},
    {'id':4,'title':'happy'},
    {'id':5,'title':'sleep'}
];
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//post,delect,patch,get,增删改查该数组
app
.get('/todos',(req,res)=>{
    res.json(todos)
})
.post('/todos',(req,res)=>{
    console.log(req.body)
    var todo = {
        id:todos[todos.length - 1].id + 1,
        title:req.body.title
    }
    todos.push(todo)
    res.json(todo)
})
.patch('/todos',(req,res)=>{

})
.delete('/todos',(req,res)=>{

})

//starting server
app.listen(3000,(err) => console.log('nodo server running 3000...'))