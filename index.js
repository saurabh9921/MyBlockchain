const bodyParser=require('body-parser');
const express=require("express");
const Blockchain = require('./blockchain');

const app=express();
const blockchain = new Blockchain();
app.use(bodyParser.json())
//read
app.get('/api/blocks' ,(req,res)=>{
    res.json(blockchain.chain)
});

//write
app.post('/api/mine' ,(req,res)=>{
    const{data}=req.body;
    blockchain.addBlock({data});
    res.redirect('/api/blocks')

});


const PORT=4000;
app.listen(PORT,()=>{console.log(`lesten to port :${PORT}`);});