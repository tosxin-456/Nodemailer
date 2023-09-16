const mongoose = requIre('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  Role:{
    enum:['famrmer','user','admin'],
    default:'admin'
  }
  
})




const userModel = mongoose.model('users', userSchema)