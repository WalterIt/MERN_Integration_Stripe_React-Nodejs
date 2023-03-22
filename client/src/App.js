import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);

function App() {
  const [product, setProduct] = useState({
    name: "TV Samsung",
    price: 2450,
  });

  const priceForStripe = product.price * 100;

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: `${apiUrl}/payment`,
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });

      if (response?.status === 200) {
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Complete React & Stripe Payment Integration</h2>

      <p>
        <span>Product: </span>
        {product.name}
      </p>

      <p>
        <span>Price: </span>
        {product.price}
      </p>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
        label="Checkout Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default App;
