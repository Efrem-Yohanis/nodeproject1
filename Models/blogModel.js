const mongoose = require('mongoose')

const schema = mongoose.Schema;
const blogSchema = new schema({
       title:{
           type:String,
           required:true
           },
        snippet:{
            type:String,
            
            },
        body:{
            type:String,
            required:true
            }},
       {timeseries:true})
    
    const blog = mongoose.model('blog',blogSchema)
    module.exports = blog;