import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
    backgroundColor: '#2196f3',
    color: 'black',
});

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Fitness Tracker
                </Typography>
                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <StyledButton
                                component={Link}
                                to="/admin"
                                sx={{
                                    backgroundColor: location.pathname === '/admin' ? '#2196f3' : 'inherit',
                                    color: location.pathname === '/admin' ? 'black' : 'inherit',
                                }}
                            >
                                Admin
                            </StyledButton>
                        )}
                        <StyledButton
                            component={Link}
                            to="/"
                            sx={{
                                backgroundColor: location.pathname === '/' ? '#2196f3' : 'inherit',
                                color: location.pathname === '/' ? 'black' : 'inherit',
                            }}
                        >
                            Dashboard
                        </StyledButton>
                        <StyledButton
                            component={Link}
                            to="/workouts"
                            sx={{
                                backgroundColor: location.pathname === '/workouts' ? '#2196f3' : 'inherit',
                                color: location.pathname === '/workouts' ? 'black' : 'inherit',
                            }}
                        >
                            Workouts
                        </StyledButton>
                        <StyledButton
                            component={Link}
                            to="/goals"
                            sx={{
                                backgroundColor: location.pathname === '/goals' ? '#2196f3' : 'inherit',
                                color: location.pathname === '/goals' ? 'black' : 'inherit',
                            }}
                        >
                            Goals
                        </StyledButton>
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            Sign Up
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;