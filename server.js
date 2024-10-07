const express = require("express");
const hospitalRouter =require('./routes/hospitalRoute')
const app = express()



const PORT = 3000;

app.use(express.json())
app.use('/records',hospitalRouter )


app.get('/',(req,res)=>{

res.send("from travel api")
});



app.listen(PORT,()=>{

    console.log('server is running');
    
})