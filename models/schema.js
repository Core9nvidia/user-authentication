const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mySchema=new Schema({
    id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const authUser= mongoose.model('authUser',mySchema);
module.exports=authUser;