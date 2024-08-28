import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const CheckoutForm = ({ price, items }) => {
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const priceForStripe = price * 100;

  const onToken = token => {
    // Send the token to your server to process the payment
    fetch('/api/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, amount: priceForStripe }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error.message);
        } else {
          // Payment successful, display confirmation message
          console.log('Payment successful!');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handlePaymentMethodChange = event => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <StripeCheckout
          label="Pay with Card"
          name="Your Company Name"
          billingAddress
          shippingAddress
          description={`Your item price is $${price}`}
          amount={priceForStripe}
          token={onToken}
          stripeKey="pk_test_51P8nyyEVkseDcypUUasBLlY78f1egyb5ChVaoLeUCBw6Cr8QvNsxHxI8eLUImFe1AgZUXFETwQf3T51mV3OcZ4GE001JpdZYjr"
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <h3>Order Summary</h3>
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name} - ${item.price}</li>
          ))}
        </ul>
        <p>Total: ${price}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;


// import React, { useState } from 'react';
// import StripeCheckout from 'react-stripe-checkout';

// const CheckoutForm = ({ price, items }) => {
//     const [error, setError] = useState(null);
//     const [paymentMethod, setPaymentMethod] = useState('credit_card');

//     const priceForStripe = price * 100;

//     const onToken = token => {
//         // Send the token to your server to process the payment
//         fetch('/api/charge', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ token, amount: priceForStripe }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.error) {
//                     setError(data.error.message);
//                 } else {
//                     // Payment successful, display confirmation message
//                     console.log('Payment successful!');
//                 }
//             })
//             .catch(error => {
//                 setError(error.message);
//             });
//     };

//     const handlePaymentMethodChange = event => {
//         setPaymentMethod(event.target.value);
//     };

//     return (
//         <div>
//             <h2>Checkout</h2>
//             <form>
//                 <label>
//                     Payment Method:
//                     <select value={paymentMethod} onChange={handlePaymentMethodChange}>
//                         <option value="credit_card">Credit Card</option>
//                         <option value="paypal">PayPal</option>
//                     </select>
//                 </label>
//                 <StripeCheckout
//                     label="Pay with Card"
//                     name="Your Company Name"
//                     billingAddress
//                     shippingAddress
//                     description={`Your item price is $${price}`}
//                     amount={priceForStripe}
//                     token={onToken}
//                     stripeKey="pk_test_51P8nyyEVkseDcypUUasBLlY78f1egyb5ChVaoLeUCBw6Cr8QvNsxHxI8eLUImFe1AgZUXFETwQf3T51mV3OcZ4GE001JpdZYjr"
//                 />
//                 {error && <div style={{ color: 'red' }}>{error}</div>}
//                 <h3>Order Summary</h3>
//                 <ul>
//                     {items.map(item => (
//                         <li key={item.id}>{item.name} - ${item.price}</li>
//                     ))}
//                 </ul>
//                 <p>Total: ${price}</p>
//             </form>
//         </div>
//     );
// };

// export default CheckoutForm;