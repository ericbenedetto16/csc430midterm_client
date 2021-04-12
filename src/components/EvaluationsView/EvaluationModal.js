import React from 'react';
import { Button, Input, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const EvaluationModal = React.forwardRef(({ dismiss }) => {
    return (
        <ModalTemplate dismiss={dismiss}>
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
                            required
                        />
                        <TextField
                            id='lastName'
                            variant='outlined'
                            label='Last Name'
                            placeholder='Last Name'
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
                            required
                        />
                        <TextField
                            id='confirmPassword'
                            variant='outlined'
                            label='Confirm Password'
                            placeholder='Confirm Password'
                            type='password'
                            required
                        />
                    </div>
                    <Button
                        style={{ width: '100%', marginTop: '10px' }}
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </ModalTemplate>
    );
});
