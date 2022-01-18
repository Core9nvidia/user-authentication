const express=require('express');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const app=express();
const User=require('./models/schema');
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
const url="mongodb+srv://roha:roha@nodetut.hijdw.mongodb.net/myDB?retryWrites=true&w=majority";
const port=process.env.PORT || 3000;
mongoose.connect(url)
    .then((result)=>app.listen(port))
    .catch((err)=>console.log(err));

app.get('/',(req,res)=>{
    res.render('home',{response:'nothing'});
});
app.post('/login',(req,res)=>{
    console.log(req.body);
    User.findOne({id:req.body.id})
        .then((result)=>{
            console.log("hashed password here " ,result);
            if(!result)res.render('home',{response:'no user with this ID'});
            if(bcrypt.compare(req.body.password, result.password)){
                res.render('home',{response:'success'});
            }else{
                //res.render('home',{response:'password mismatch'});
                res.redirect('/');
            }
        })
        .catch(err=>console.log(err));
});

app.post('/signup', async (req,res)=>{
    console.log("signup : " ,req.body);
    User.findOne({"id":req.body.id})
        .then((result)=>{
            console.log("user exist array ",result);
            if(result)res.render('home',{response:'User already exist with this user ID'});
            else{
                bcrypt.hash(req.body.password, 10)
                .then((hashedPassword)=>{
                    const user = { id: req.body.id, password: hashedPassword };
                    const newuser= new User(user);
                    newuser.save()
                        .then((result)=>{
                            res.render('home',{response:"User sucessfully saved!"});
                        })
                        .catch(err=>console.log(err));
                })
                .catch(err=>console.log(err));
            }
        })
        .catch(err=>console.log(err));
    
    // bcrypt.hash(req.body.password, 10)
    //     .then((hashedPassword)=>{
    //         const user = { id: req.body.id, password: hashedPassword };
    //         const newuser= new User(user);
    //         newuser.save()
    //             .then((result)=>{
    //                 res.render('home',{response:"User sucessfully saved!"});
    //             })
    //             .catch(err=>console.log(err));
    //     })
    //     .catch(err=>console.log(err));
    
});
