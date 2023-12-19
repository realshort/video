import React from 'react';
import { Button } from '@mui/material';
// import { loadStripe } from '@stripe/stripe-js';

// // Test public key
// const stripePromise = loadStripe("pk_test_51OFXw4Lvs8YNyX8swQOIbwVtntvw5BaZ36VFC6mIOMqk8jZdnl6DuhdiQn87b8BvP04UfqNzjI00KIwGV4scCZEk00IdJ7Htan");

// const VipButton = ({ border, color, content1, content2, content3 }) => {
//   const handleCheckout = async () => {
//     try {
//       const stripe = await stripePromise;
//       const response = await fetch('http://127.0.0.1:8080/create-checkout-session', { method: 'POST' });

//       if (!response.ok) {
//         throw new Error('Network response was not OK');
//       }

//       const { sessionId } = await response.json();

//       const result = await stripe.redirectToCheckout({
//         sessionId,
//       });

//       if (result.error) {
//         alert(result.error.message);
//       }
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//     }
//   };  

const VipButton = ({ url, border, color, content1, content2, content3 }) => {
  return (
    <Button onClick={() => {
      window.open(url, "_blank");
    }}
      style={{
        margin: '10px 20px',
        display: 'flex',
        alignItems: 'stretch',
        border: border,
        borderRadius: '10px',
        padding: 0,
      }}
    >
      <div
        style={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <h4 style={{ margin: '8px 0 0 0', color: '#fff', lineHeight: '1.2' }}>
          {content1}
        </h4>
        <h5 style={{ margin: '0', color: color, lineHeight: '1.2' }}>
          {content2}
        </h5>
      </div>
      <div
        style={{
          width: '30%',
          backgroundColor: color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '0 5px 5px 0',
          height: '45px',
        }}
      >
        <h3 style={{ margin: '0', color: '#fff' }}>
          {content3}
        </h3>
      </div>
    </Button>
  );
};

export default VipButton;
