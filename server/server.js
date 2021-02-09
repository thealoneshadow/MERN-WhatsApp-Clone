// importing
import express from "express";
import mongoose from "mongoose";
import dbMessages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;


const pusher = new Pusher({
  appId: "1151858",
  key: "ac59a4cb0c0ba37ef07d",
  secret: "1e3ff67245b71f7e1637",
  cluster: "ap2",
  useTLS: true
});

const db=mongoose.connection;
db.once('open',() => {
console.log("DB connected");
const msgCollection =db.collection("messagecontents");
const changeStream = msgCollection.watch();

changeStream.on('change',(change)=> {
  console.log(change);
  if(change.operationType === 'insert')
  {
    const messageDetails = change.fullDocument;
    pusher.trigger("messages",'inserted',{
        name: messageDetails.name,
        message: messageDetails.message,
        timestap: messageDetails.timestamp,
        received: messageDetails.received,
    });
  }
  else {
    console.log("Erro Triggering Pusher");
  }

})
});


//middleware
app.use(express.json());
app.use(cors());

//DB config
const connection_url =
  "mongodb+srv://admin:6397984019Jio@cluster0.yii8a.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ????


// api routes
app.get("/", (req, res) => res.status(200).send("Hellow World"));
app.get("/messages/sync",(erq,res) => {
   dbMessages.find((err,data)=> {
       if(err)
       {
           res.status(500).send(err);
       }
       else {
           res.status(200).send(data);
       }
   }) 
});
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  dbMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  })
});

//listen
app.listen(port, () => {
  console.log("Listening At PORT 9000");
});
