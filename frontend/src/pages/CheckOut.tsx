import React from 'react';
import 'index.css';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from 'components/ChackOutForms/CheckOutForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <StripeProvider apiKey="pk_test_51JUq1hIrPhnpYWovSUw0dxeCGieBR1thicboDmm05hV0rHkuFD5IJMmgKFQjxBVDDUgZLorsmrcXWBTfPztDq6Kr00q8ZkRYKh">
        <Elements>
            <CheckoutForm />
        </Elements>
      </StripeProvider>
    </div>
  );
}

export default App;