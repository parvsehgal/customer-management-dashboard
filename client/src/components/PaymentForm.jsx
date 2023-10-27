// Form to add/update payment details
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';

function PaymentForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/customer/add', {
        phoneNumber,
        name
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding customer', error);
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField 
          label="Phone Number" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField 
          label="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default PaymentForm;
