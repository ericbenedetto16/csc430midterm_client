import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const StudentModal = React.forwardRef(({ dismiss }, ref) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const onSubmit = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/students/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                    body: JSON.stringify({
                        student: {
                            firstName: fName,
                            lastName: lName,
                            email: email,
                            password: password,
                        },
                        // TODO: Implement Parent Part in Form
                        parent: {
                            firstName: fName,
                            lastName: lName,
                            email: email,
                            password: password,
                        },
                        grade: grade,
                    }),
                }
            );

            const json = await res.json();

            if (!json.success) throw new Error("Couldn't Submit Form");

            alert('Student Successfully Created');
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
                    Create New Student
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
                            id='grade'
                            label='Grade'
                            placeholder='Grade'
                            type='number'
                            onChange={(e) => setGrade(e.target.value)}
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
