const express = require('express');
const database = require('./database/database');
const cors = require('cors');

const corsOptions = {
    origin: "*",
    methods: "*",
    preflightContinue: false,
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json({limit: '10mb'}));
app.use(cors(corsOptions));

app.listen(44444, () => {
    console.log("Server started")
})

//#region routes

app.route('/api/account/register').post((req, res) => {
    database.registerUser(req.body).then(status => {
        res.status(status ? 200 : 406).send(status ? {message: "OK"} : {message: "Username taken"});
    });
})

app.route('/api/account/authenticate').post((req, res) => {
    database.authenticateUser(req.body).then(user => {
        res.status(user ? 200 : 404).send(user ? user : {message: 'Bad credentials'});
    })
})

app.route('/api/user/place-order').post((req, res) => {
    database.placeOrder(req.headers, req.body).then(status => {
        res.status(status ? 200 : 406).send(status ? {message: "OK"} : {message: "Place order failed :("});
    })
})

app.route('/api/user/orders').get((req, res) => {
    database.getOrders(req.headers).then(orders => {
        res.status(200).send(orders);
    })
})

app.route('/api/user/orders/:order').delete((req, res) => {
    database.deleteOrder(req.params['order']).then(status => {
        res.status(status ? 200 : 406).send(status ? {message: "OK"} : {message: "Delete order failed :("});
    })
})



//#endregion

