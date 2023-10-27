// Form to add/update treatments
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid , FormControlLabel,Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';


function TreatmentForm({ phoneNumber }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [current, setCurrent] = useState(true);

    const handleSubmit = async () => {
        try {
            await axios.post(`http://localhost:3000/customer/${phoneNumber}/addTreatment`, {
                description, 
                amount, 
                current
            });
        } catch (error) {
            console.error('Error adding treatment', error);
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Typography variant="h5">Add Treatment</Typography>
            <Grid item>
                <TextField 
                    label="Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField 
                    label="Amount" 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={current}
                            onChange={(e) => setCurrent(e.target.checked)}
                        />
                    }
                    label="Is Current Treatment?"
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add Treatment
                </Button>
            </Grid>
        </Grid>
    );
}

export default TreatmentForm;
