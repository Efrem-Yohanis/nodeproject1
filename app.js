const express = require('express')
const { timeout } = require('nodemon/lib/config')
const app = express()
const mongoose = require('mongoose')
const blog = require('./Models/blogModel')
const { result } = require('lodash')

const remoteDburl = 'mongodb+srv://efremyohanis116:fCmvix8BgDTYzqzW@cluster0.8hx7jke.mongodb.net/efremDb?retryWrites=true&w=majority'
const localDburl = 'mongodb://0.0.0.0:27017/myDb';

mongoose.connect(remoteDburl).then((result)=>{
  console.log("db connected")
  app.listen(8000)
  console.log("app is running .........")
}).catch((error)=>{
  console.log(error)
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.redirect('/blogs')
})

app.get('/blogs', (req, res)=>{
  const titel = 'home page'
  blog.find().then((result)=>{
    res.render('home',{blog:result,titel})
  })
})

app.post('/blogs', (req, res)=>{
  
  const Blog = new blog(req.body)
  
  Blog.save().then((result)=>{
    res.redirect('/blogs')
  }).catch((error)=>{
    console.log(error)
  })
})

app.get('/blogs/:id',(req,res)=>{
  const req_blog = blog.findById(req.params.id).then((result)=>{
    res.render('detailview',{blog:result,titel:"detail view"})
  }).catch((error)=>{
    console.log(error)
  })
 
})



app.delete('/delete/:id',(req,res)=>{
  blog.deleteOne(req.params.id).then((result)=>{
    console.log("deleted")
    res.redirect('/blogs')
  }).catch((error)=>{
    console.log(error)
  })
 
})

app.get('/create',(req,res)=>{
    const titel = 'create page';
    res.render('create',{titel})
    
})

app.get('/about', (req, res)=>{
    const titel = 'about page';
    res.render('about',{titel})
  })

app.use((req,res)=>{
    const titel = 'Not found';
    res.status(404).render('404',{titel})
})
app.listen(3000)