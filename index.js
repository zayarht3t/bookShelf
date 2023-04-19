const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AuthRouter = require('./routes/auth.js');
const bookRouter = require('./routes/book.js');
const userRouter = require('./routes/user.js');


//middlewares
 

app.use(cookieParser());
dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true,
    methods: "GET,PUT,POST,DELETE" //included credentials as true
};

app.use(cors(corsOptions));


//error middleware
app.use((err,req,res,next)=>{
    const errMsg = err.message || "something went wrong";
    const statusCode = err.status || 500;
    return res.status(statusCode).json({message: errMsg})});

//Router configuration
app.use('/api/auth',AuthRouter);
app.use('/api/books',bookRouter);
app.use('/api/users',userRouter);






//database configuration
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    app.listen(8000,()=>{
    console.log('listening on http://localhost:8000');
})
}).catch(error=>{
    console.log(error);
})


