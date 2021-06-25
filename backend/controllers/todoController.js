const fs = require('fs');
const util = require('util');
const { nanoid } = require('nanoid')
const filePath = './db/todo.json'
const readFile = util.promisify(fs.readFile);
const {checkDb, allData, singleData} = require('../helper')
const ErrorResponse = require('../utils/errorResponse')

exports.create = async(req, res, next) => {
      try {
            const data = req.body;
            // res.status(200).json({data}); return;
            data.id = nanoid(16);
            data.user_id = data.user_id;
            
            let Data = await readFile(filePath, 'utf-8');
            let Todos = []
            
            if(Data){
                  Todos = JSON.parse(Data);
            }
            if(Todos == "undefined" || Todos == "String" || Todos == "null"){
                  Todos.push({
                        id: data.id,
                        user_id: data.user_id,
                        title: data.title,
                        description: data.description,
                  });
            }else{
                  let chk = checkDb(Todos,'title' ,data.title)
                  if(chk){
                        return next(new ErrorResponse("todos already exists", 400));
                  }else{
                        Todos.push({
                              id: data.id,
                              user_id: data.user_id,
                              title: data.title,
                              description: data.description,
                        }); 
                  }
            }
            saveTodo(Todos)
            res.status(201).json({
                  error: 'false',
                  code: 201,
                  message: 'Todos Created Successfully'
            });
            
      } catch (error) {
            next(error)
      }
}

function saveTodo(Todos){
      fs.writeFileSync(filePath, JSON.stringify(Todos, null, 2), (error) => {
            if(error) {
                  return next(new ErrorResponse("error found in creating files", 400));
            }
      })
}

exports.viewAll = async (req,res,next) => {
      try {
            // res.send(req.body); return;
            let Data = await readFile(filePath, 'utf-8');
            let Todos = []
            if(Data){
                  Todos = JSON.parse(Data);
                  Todos = allData(Todos,'user_id',req.body.user_id);
            }
            res.status(201).json({
                  error: 'false',
                  code: 201,
                  data: Todos
            });    
      } catch (error) {
            next(error);
      }
}
exports.view = async (req,res,next) => {
      try {
            let id = req?.params?.id
            let user_id = req?.body?.user_id
            let Data = await readFile(filePath, 'utf-8');
            let Todos = {}
            if(Data){
                  Todos = JSON.parse(Data);
                  Todos = Todos.filter( todo => (todo.id === id && todo.user_id === user_id));
                  Todos = Todos[0]
            }
            res.status(201).json({
                  error: 'false',
                  code: 201,
                  data: Todos
            });    
      } catch (error) {
            next(error);
      }
}
exports.update = async (req,res,next) => {
      try {
            let id = req?.params?.id
            let user_id = req?.body?.user_id
            let title = req?.body?.title
            let description = req?.body?.description
            // res.status(200).json({title}); return;

            let Data = await readFile(filePath, 'utf-8');
            let Todos = []
            if(Data){
                  Todos = JSON.parse(Data);
                  let TodoIndex = await Todos.findIndex((todo) => (todo.id === id && todo.user_id === user_id))
                  if(Todos[TodoIndex].title != title){
                        Todos[TodoIndex].title = title
                  }
                  
                  if(Todos[TodoIndex].description != description){
                        Todos[TodoIndex].description = description
                  }

                  saveTodo(Todos)
            }
            res.status(201).json({
                  error: 'false',
                  code: 201,
                  data: Todos
            });    
      } catch (error) {
            next(error);
      }
}
exports.delete = async (req,res,next) => {
      try {
            let id = req?.params?.id
            let user_id = req?.body?.user_id
            let Data = await readFile(filePath, 'utf-8');
            let Todos = []
            if(Data){
                  Todos = JSON.parse(Data);
                  Todos.splice(Todos.findIndex( todo => (todo.id === id && todo.user_id === user_id)), 1)
                  
                  // res.status(201).json(Todos); return;
                  saveTodo(Todos);
                  res.status(201).json({
                        error: 'false',
                        code: 201,
                        data: Todos
                  });
            }else{
                  res.status(201).json({
                        error: 'false',
                        code: 201,
                        data: Todos
                  });
            }    
      } catch (error) {
            next(error);
      }
}
