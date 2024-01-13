const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;

const Stripe = require("stripe");
const stripe = Stripe("sk_test_51OW3NPJ23i0YnrBprq73uUD6yNmqsP6ry9rQ4sF44BJHUXkEfdhvsAmjR1nN6F1nJjxwlde4tKxBm7PHPCU5loAJ00r6zt8joj");

const app = express();
app.use(bodyParser.json());
app.post("/create-payment-intent", (req, res) => {
  stripe.paymentIntents.create(
    {
      amount: parseInt(req.body.amount),
      currency: "usd",
      payment_method_types: ["card"],
    },
    function (err, paymentIntent) {
      if (err) {
        res.status(500).json(err.message);
      } else {
        res.status(201).json(paymentIntent);
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
