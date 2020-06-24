require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken')
const utils = require('./utils')
const db = require('./db')
const cookieParser = require('cookie-parser')


var app = express();
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieParser(process.env.cookie_secret));

const PORT = process.env.PORT || 5000;


const tokenMiddleware = (req,res,next)=>{
    // res.status(200).json({
    //     message:'check'
    // })
    var token = req.headers['authorization']
    // console.log(req.headers['authorization'])

    if(!token)
    {
        res.status(401).json({
            message:'invalid authorization'
        })
    }
    else
    {
        next();
    }
}


app.post('/sign-in',async (req,res)=>{
    // console.log(req.body)
    const credentials = {
        username:req.body.username,
        password:req.body.password
    }
    // console.log(credentials)

    if(!credentials.username || !credentials.password)
    {
      res.status(400).json({
          error:true,
          message:'Username or password required'
      });  
    }

    var users;

    await db.connect().then(async  (client)=>{
        users = await client.db('Shop_app').collection('users').findOne({username:credentials.username})
    })

    // console.log(users)
    if(users==null)
    {
        res.status(401).json({
            error:true,
            message:'Incorrect Username'
        })
    }
    else if(users.password !== credentials.password)
    {
        res.status(401).json({
            error:true,
            message:'Incorrect Password'
        })
    }
    else
    {
        const token = utils.getUserToken(credentials);
        // console.log(token)
        res.status(200).json({
            token:token
        })
        
    }

    


    
})

app.get('/verify',tokenMiddleware,(req,res)=>{

    const token = req.headers['authorization'];

    jwt.verify(token,process.env.jwt_secret,async (err,res1)=>{
        if(err)
        {
            // console.log('err')
            res.status(401).json({
                error:true,
                message:'Invalid Login Credentials'
            })
        }
        // console.log(res1)
        else
        {
        var users;
        // console.log('our')

        await db.connect().then(async  (client)=>{
            users = await client.db('Shop_app').collection('users').findOne({username:res1.name})
        })


        if(users==null)
        {
            res.status(401).json({
                error:true,
                message:'Invalid Login Credentials'
            })
        }
        else
        {
            res.status(200).json({
                user:users,
                token:token
            })
        }
    }

    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
  
  }
  

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log('successfully connected');
})