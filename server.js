import express from "express";
import mongoose from "mongoose";
import Cards from "./dbcards.js";
import Cors from 'cors';

const app=express();
const port=process.env.PORT || 8001;
const connection_url='mongodb+srv://Shyamal:sSw3A9zEWnZAb7u6@cluster0.4l98j.mongodb.net/tinderdb?retryWrites=true&w=majority';

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


app.get('/',(req,res)=>res.status(200).send('hello'));

app.post("/tinder/cards",(req,res)=>{
    const dbcard=req.body;
    Cards.create(dbcard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data);
        }
    })
});

app.get("/tinder/cards",(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    })
})
app.listen(port, ()=>console.log(`listening on localhost: ${port}`));