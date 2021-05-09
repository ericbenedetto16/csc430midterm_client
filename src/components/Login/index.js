import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from '../../hooks';
import { ROLES } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
    },
    rightCol: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '15px',
    },
    darkBg: {
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '50px',
    },
    heroText: {
        color: 'white',
        fontSize: '2em',
        marginBottom: 0,
        fontWeight: 100,
    },
    heroSubtitle: {
        color: 'white',
        fontSize: '1em',
    },
}));

export const Login = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const history = useHistory();

    const { logged } = useAuthentication(new Set(Object.values(ROLES)));

    useEffect(() => {
        if (logged) history.push('/');
    });

    return (
        <Grid container className={classes.container} spacing={0}>
            <Grid item xs={4} className={classes.darkBg}>
                <p className={classes.heroText}>
                    Application <br />
                    Login Page
                </p>
                <p className={classes.heroSubtitle}>
                    Login from Here to Access
                </p>
            </Grid>
            <Grid item xs={8} className={classes.rightCol}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            setInvalid(false);

                            const data = {
                                username: username,
                                password: password,
                            };
                            const res = await fetch(
                                `${process.env.REACT_APP_API_URL}/api/v1/login/`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                }
                            );

                            const json = await res.json();

                            if (!json.success) {
                                setInvalid(true);
                                return;
                            }

                            localStorage.setItem(
                                'access_token',
                                json.access_token
                            );

                            history.push('/');
                        } catch (err) {
                            setInvalid(true);
                            alert('Error Logging In');
                        }
                    }}
                    style={{ display: 'flex', flexFlow: 'column' }}
                >
                    <TextField
                        required
                        id='username'
                        label='Username'
                        placeholder='Username'
                        variant='outlined'
                        error={invalid}
                        style={{ marginBottom: '10px', width: '350px' }}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        id='password'
                        label='Password'
                        placeholder='Password'
                        type='password'
                        variant='outlined'
                        error={invalid}
                        helperText={
                            invalid ? 'Invalid Username or Password' : ''
                        }
                        style={{ marginBottom: '10px', width: '350px' }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Login
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};
