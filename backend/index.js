const express = require('express') ;
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();



const docRoutes = require('./routes/docRoutes');
const userRoutes = require('./routes/userRoutes');

const Docs = require('./models/docs.js')

const app = express() 
const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost",
            methods: ["GET", "POST", "PATCH","DELETE"],
            credentials: true,
            transports: ['websocket', 'polling'],
    },
    allowEIO3: true
    }
);

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('join-and-get-doc', async (docId) => {
       
        const data = await Docs.findById({_id : docId}) ;
        if(!data)
            {
                console.log(error) ; return ;
            }
        socket.join(docId);
     //    console.log(data) ;
        socket.emit('load-document',data)
       
      
       return ;
    });
  
    socket.on('send-changes', ({docId,title,body}) => {
      socket.broadcast.to(docId).emit('receive-changes',{title,body});
    //    console.log({docId,title,body}) ;
    });
  
    socket.on('save-doc', async ({docId, title, body}) => {
        try {
            const data = await Docs.findByIdAndUpdate( {_id : docId}, {title, body }) ;
            return data ;
        } catch (error) {
            console.log(error) ;
        }
     
    });


  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });



const dburl = process.env.MONGO_URI ;
mongoose.set('strictQuery',true) ;
const port = process.env.PORT;
mongoose.connect(dburl) 
.then((result) => server.listen(port)) // we want to listen for  after server is connected to mongodb
.catch((error) => console.log(error)) ;

app.use('/api/docs', docRoutes)
app.use('/api/user',userRoutes);