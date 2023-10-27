import React from 'react';
import { Container } from '@mui/material';
import CustomerForm from './components/CustomerForm';
import TreatmentForm from './components/TreatmentsForm';
import PaymentForm from './components/PaymentForm';
import DisplayCustomerData from './components/DisplayCutomerData'
import Copyright from './Copyright';


function App() {
  const [phoneNumber, setPhoneNumber] = React.useState('');

  return (
    <div className="App">
      <h1>Beauty Parlour Customer Management</h1>
      <div style={{display:'flex'}}>
        <CustomerForm />
        <TreatmentForm />
        <PaymentForm />
      </div>
      <Copyright/>
    </div>
    // <Container>
    //         <CustomerForm setPhoneNumber={setPhoneNumber} />
    //         <TreatmentForm phoneNumber={phoneNumber} />
    //         <DisplayCustomerData phoneNumber={phoneNumber} />
    // </Container>
  );
}

export default App;
