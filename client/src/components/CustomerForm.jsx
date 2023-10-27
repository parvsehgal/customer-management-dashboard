// Form to add/update customer
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';


function CustomerForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [customer, setCustomer] = useState(null);

    const searchCustomer = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/customer/${phoneNumber}`);
            if (response.data) {
                setCustomer(response.data);
                setName(response.data.name);
            }
        } catch (error) {
            console.error('Error fetching customer', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/customer/add', {
                phoneNumber,
                name
            });
            setCustomer(response.data);
        } catch (error) {
            console.error('Error adding/updating customer', error);
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Typography variant="h5">Customer Information</Typography>
            <Grid item>
                <TextField 
                    label="Phone Number" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button onClick={searchCustomer}>Search</Button>
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
                    {customer ? 'Update' : 'Add'}
                </Button>
            </Grid>
        </Grid>
    );
}

export default CustomerForm;
