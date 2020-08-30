/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))*/
const express = require("express");
const app = express();
//const mongoose = require("mongoose");
const employees = require("./models/users");
const chatmodel = require("./models/chat");
const connection= require("./config");
//const router = express.Router();
const port = 8082;
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const server = app.listen(port, () => console.log('Server is running on Port '+ port));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/registeruser",(req,res) => {
	console.log(req.body)
	employees.registeruser(req.body).then(item => {
		if(item) {
			res.status(200).send(item);
		}
		else {
			res.status(201).send({message:"cannot register.."});
		}
	})
	.catch(err => {
		res.status(400).send("Unable to register");
	});
});
app.post("/loginuser",(req,res) => {
	console.log(req.body)
	employees.loginuser(req.body).then(item => {
		if(item) {
			res.status(200).send(item[0]);
		}
		else {
			res.status(201).send({message:"wrong credentials"});
		}
	})
	.catch(err => {
		res.status(400).send("user not found");
	});
});
app.get("/userList",(req,res) => {
	console.log(req.body)
	employees.userList(req.body).then(item => {
		if(item) {
			res.status(200).send(item);
		}
		else {
			res.status(201).send({message:"no records"});
		}
	})
	.catch(err => {
		res.status(400).send(err);
	});
});
app.post("/chatInsert",(req,res) => {
	console.log(req.body)
	chatmodel.chatInsert(req.body).then(item => {
		if(item) {
			res.status(200).send(item);
		}
		else {
			res.status(201).send({message: "No Records found"});
		}
	})
	.catch(err => {
		res.status(400).send(err);
	});
});
app.post("/chatList",(req,res) => {
	//console.log(req.body)
	chatmodel.getChatList(req.body).then(item => {
		if(item && item.length>0) {
			res.status(200).send(item);
		}
		else {
			res.status(201).send({message:"No Records found"});
		}
	})
	.catch(err => {
		res.status(400).send(err);
	});
});

const websocket = socketio(server);
websocket.on('connection', function (socket) {
	socket.on('chatMessage', (data) => {
		chatmodel.chatInsert(data)
	});

	socket.on('getMessage', (data) => {
		let chatList = chatmodel.getChatList(data).then(chatList => {
			//console.log(chatList,"chatList")
			socket.emit('receiveMessage', chatList);
		});
	});
})

/*app.listen(port, () => console.log('Server is running on Port '+ port));*/