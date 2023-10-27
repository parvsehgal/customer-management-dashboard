import React, { useEffect, useState } from 'react';
import { Grid, Typography, Tab, Tabs, Paper } from '@mui/material';
import axios from 'axios';

function DisplayCustomerData({ phoneNumber }) {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/customer/${phoneNumber}`);
                setCustomer(response.data);
            } catch (error) {
                console.error('Error fetching customer data', error);
            }
        };
        fetchCustomer();
    }, [phoneNumber]);

    if (!customer) return <Typography>Loading...</Typography>;

    return (
        <Grid container direction="column" spacing={2}>
            <Typography variant="h5">Customer Details</Typography>
            <Grid item>
                <Paper>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Past Treatments" />
                        <Tab label="Current Treatments" />
                        <Tab label="Payments" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        {customer.pastTreatments.map(treatment => (
                            <Typography>{treatment.description} - ${treatment.amount}</Typography>
                        ))}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {customer.currentTreatments.map(treatment => (
                            <Typography>{treatment.description} - ${treatment.amount}</Typography>
                        ))}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Typography>Total Paid: ${customer.totalPaid}</Typography>
                        <Typography>Total Due: ${customer.totalDue}</Typography>
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

export default DisplayCustomerData;
