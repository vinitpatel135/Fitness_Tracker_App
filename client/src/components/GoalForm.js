import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import axios from '../services/api';

const GoalForm = ({ initialData, onSuccess }) => {
    const [goalType, setGoalType] = useState(initialData?.goalType || '');
    const [targetValue, setTargetValue] = useState(initialData?.targetValue || '');
    const [timeFrame, setTimeFrame] = useState(initialData?.timeFrame || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const goalData = { goalType, targetValue, timeFrame };
        try {
            if (initialData) {
                await axios.put(`/goals/${initialData._id}`, goalData);
            } else {
                await axios.post('/goals', goalData);
            }
            onSuccess();
        } catch (error) {
            console.error('Goal submission failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                <Box mt={3}>
                    <Typography variant="h6" align="center">{initialData ? 'Edit' : 'Add'} Goal</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Goal Type"
                            fullWidth
                            margin="normal"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            required
                        />
                        <TextField
                            label="Target Value"
                            fullWidth
                            margin="normal"
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            required
                            type="number"
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Time Frame</InputLabel>
                            <Select
                                value={timeFrame}
                                onChange={(e) => setTimeFrame(e.target.value)}
                            >
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {initialData ? 'Update' : 'Add'} Goal
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default GoalForm;
