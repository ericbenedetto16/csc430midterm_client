import React, { useState } from 'react';
import { Button, Input, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const FacultyModal = React.forwardRef(({ dismiss }) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const onSubmit = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/faculty/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                    body: JSON.stringify({
                        firstName: fName,
                        lastName: lName,
                        email: email,
                        password: password,
                        salary: salary,
                    }),
                }
            );

            const json = await res.json();
            if (!json.success) throw new Error("Couldn't Submit Form");

            alert('Faculty Successfully Created');
            // TODO: Instead of Refresh, Update State and Re-Render
            window.location.reload();
        } catch (err) {
            alert('Error Submitting Form!');
        }
    };

    return (
        <ModalTemplate dismiss={dismiss} onSubmit={onSubmit}>
            <div style={{ margin: '20px' }}>
                <Typography
                    variant='h4'
                    style={{ marginBottom: '5px', textAlign: 'center' }}
                >
                    Create New Faculty Member
                </Typography>
                <div style={{ width: '80%', margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                        }}
                    >
                        <TextField
                            id='firstName'
                            variant='outlined'
                            label='First Name'
                            placeholder='First Name'
                            onChange={(e) => setFName(e.target.value)}
                            required
                        />
                        <TextField
                            id='lastName'
                            variant='outlined'
                            label='Last Name'
                            placeholder='Last Name'
                            onChange={(e) => setLName(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            id='email'
                            variant='outlined'
                            label='Email'
                            placeholder='Email'
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            id='salary'
                            label='Salary'
                            placeholder='Salary'
                            type='number'
                            onChange={(e) => setSalary(e.target.value)}
                            style={{ width: '100%' }}
                            required
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextField
                            id='password'
                            variant='outlined'
                            label='Password'
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <TextField
                            id='confirmPassword'
                            variant='outlined'
                            label='Confirm Password'
                            placeholder='Confirm Password'
                            type='password'
                            onChange={(e) => setCPassword(e.target.value)}
                            error={password !== cPassword && cPassword !== ''}
                            helperText={
                                password !== cPassword && cPassword !== ''
                                    ? 'Passwords Do Not Match'
                                    : ''
                            }
                            required
                        />
                    </div>
                    <Button
                        style={{ width: '100%', marginTop: '10px' }}
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={password !== cPassword && cPassword !== ''}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </ModalTemplate>
    );
});
