import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    CircularProgress,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: '12px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[6],
    },
}));

const AdminDashboard = () => {
    const [userStatistics, setUserStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/statistics');
                setUserStatistics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Dashboard
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {userStatistics.map(({ user, goals, workouts }) => (
                            <Grid item xs={12} sm={6} md={4} key={user._id}>
                                <StyledCard>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {user.name} ({user.email})
                                        </Typography>
                                        <Divider />
                                        <Box display="flex" alignItems="center" mt={2}>
                                            <EmojiEventsIcon color="primary" />
                                            <Typography variant="subtitle1" ml={1}>
                                                Goals
                                            </Typography>
                                        </Box>
                                        {goals.map((goal) => (
                                            <Typography key={goal._id} variant="body2">
                                                {goal.goalType} - Target: {goal.targetValue} - Progress: {goal.progress}
                                            </Typography>
                                        ))}
                                        <Divider />
                                        <Box display="flex" alignItems="center" mt={2}>
                                            <FitnessCenterIcon color="secondary" />
                                            <Typography variant="subtitle1" ml={1}>
                                                Workouts
                                            </Typography>
                                        </Box>
                                        {workouts.map((workout) => (
                                            <Typography key={workout._id} variant="body2">
                                                {workout.activity} - Duration: {workout.duration} min
                                            </Typography>
                                        ))}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View Details
                                        </Button>
                                    </CardActions>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default AdminDashboard;
