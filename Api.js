const express = require("express");
const Joi = require('joi');

const app = express();
app.use(express.json())

const courses = [
  {id : 1, name: 'course 1'},
  {id : 2, name: 'course 2'},
  {id : 3, name: 'course 3'}

]

app.get('/', function(req, res){
  res.send("connected");  
});
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) =>{
 
  const {error} = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.detail[0].message);
    return; 
  }
  const course = {
    id : courses.length + 1,
    name: req.body.name
  }
  courses = push(course);
  res.send(course)
});

app.put('/api/courses', (req, res)=>{
  let course = courses.find (c => c.id === parseInt(req.params.id));
  if(!course){
     res.status(404).send('course not found');
     return;
  
    } 
  const {error} = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.detail[0].message);
    return;
  }
  const Schema ={
    name : Joi.string().min(3).required()
  };
 

  course.name = request.body.name;
  res.send(course);
});

function validateCourse(course){
  const result = Joi.validate(req.body, Schema);
  if (result.error) {
    res.status(400).send(result.error.detail[0].message);
    return Joi.validate(course, Schema);
  }
};


app.delete('/api/courses/:id', (req, res)=>{
  let course = courses.find (c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('course not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course)

})

app.get('/api/courses/:id', (req, res) => {
  let course = courses.find (c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('course not found')
  res.send(course)
});
//app.delete();
const port = process.env.PORT || 3000
app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});