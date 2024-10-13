
const express = require('express')

const app = express();
const Razorpay = require('razorpay');
const cors = require("cors");

const port = 3000;

// Use cors middleware
app.use(cors());

// Use express.json() to parse JSON bodies
app.use(express.json());

app.post('/order', async (req, res) => {
    const body = req.body;

    const razorpay = new Razorpay({
        key_id: body.key,
        key_secret: body.secret,
    });

    console.log(body); 


    if (!body.amount || !body.currency) {
        return res.status(400).send({ message: 'No amount or currency provided' });
    }

    const options = {
        amount: body.amount,
        currency: body.currency,
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options);
        res.status(201).send({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
            message:"order Created Successfully"
        });
    } catch (err) {
        res.status(400).send('Not able to create order. Please try again!');
    }
});

app.get('/', (req, res) => {
    console.log('homePage');
    res.status(200).send({ message: 'Homepage' });
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});
