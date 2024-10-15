import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from '../services/api';

const WorkoutForm = ({ initialData, onSuccess }) => {
    const [activity, setActivity] = useState(initialData?.activity || '');
    const [duration, setDuration] = useState(initialData?.duration || '');
    const [caloriesBurned, setCaloriesBurned] = useState(initialData?.caloriesBurned || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workoutData = { activity, duration, caloriesBurned };
        try {
            if (initialData) {
                await axios.put(`/workouts/${initialData._id}`, workoutData);
            } else {
                await axios.post('/workouts', workoutData);
            }
            onSuccess();
        } catch (error) {
            console.error('Workout submission failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={3} border={1} borderColor="grey.300" borderRadius={2} p={3}>
                <Typography variant="h6" align="center">{initialData ? 'Edit' : 'Add'} Workout</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Activity"
                        fullWidth
                        margin="normal"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        required
                    />
                    <TextField
                        label="Duration (minutes)"
                        fullWidth
                        margin="normal"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                    <TextField
                        label="Calories Burned"
                        fullWidth
                        margin="normal"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {initialData ? 'Update' : 'Add'} Workout
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default WorkoutForm;
