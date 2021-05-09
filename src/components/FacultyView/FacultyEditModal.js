import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const FacultyEditModal = React.forwardRef(
    ({ id, data, dismiss }, ref) => {
        const { user } = data.row;
        const [fName, setFName] = useState(user.firstName);
        const [lName, setLName] = useState(user.lastName);
        const [email, setEmail] = useState(user.email);
        const [salary, setSalary] = useState(data.row.salary);

        const onSubmit = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/v1/faculty/${id}`,
                    {
                        method: 'PATCH',
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
                            salary: salary,
                        }),
                    }
                );

                const json = await res.json();

                if (!json.success) throw new Error("Couldn't Submit Form");

                alert('Faculty Successfully Edited');
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
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                                required
                            />
                            <TextField
                                id='lastName'
                                variant='outlined'
                                label='Last Name'
                                placeholder='Last Name'
                                value={lName}
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
                                value={email}
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
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                style={{ width: '100%' }}
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
    }
);
