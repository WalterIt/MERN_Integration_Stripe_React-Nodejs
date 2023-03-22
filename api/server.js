const express = require("express");
const bodyParser = require("body-parser");
const stripeRoute = require("./routes/stripe");
require("dotenv").config();
var cors = require("cors");
const Stripe = require("stripe")(process.env.SECRET_KEY);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use("/checkout", stripeRoute);

// app.post("/payment", async (req, res) => {
//   let status;
//   const { token, amount } = req.body;
//   //   console.log(token);
//   try {
//     const data = await Stripe.charges.create({
//       source: token.id,
//       amount,
//       currency: "usd",
//     });
//     status = "success";
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     status = "Failure";
//     res.json({ error: error.message, status }); // Envie também o erro para o cliente
//   }
// });

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Your server is running on port 5000!");
});
