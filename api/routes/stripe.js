const router = require("express").Router();
const { payment } = require("../controllers/stripe.js");

router.post("/payment", payment);

module.exports = router;
