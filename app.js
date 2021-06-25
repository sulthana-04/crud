const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
app.use('/details', postsRoute);
app.use('/api/user',authRoute);
//connect to db
const mongoUri="mongodb+srv://sulthana:sulthana@crud.xngbi.mongodb.net/sulthana?retryWrites=true&w=majority"
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true },
    
    () => console.log('connect to db')
);

const port = process.env.PORT|| 5000
app.listen(port, ()=> {
    console.log ("listening to 5000");
})