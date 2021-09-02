import React from 'react';
import 'index.css';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from 'components/ChackOutForms/CheckOutForm';

const App: React.FC = () => {
  const key: any = process.env.REACT_APP_STRIPE_KEY
  return (
    <div className="App">
      <StripeProvider apiKey={key}>
        <Elements>
            <CheckoutForm />
        </Elements>
      </StripeProvider>
    </div>
  );
}

export default App;