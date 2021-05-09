import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const StudentEditModal = React.forwardRef(
    ({ id, data, dismiss }, ref) => {
        const { parent, user } = data.row;
        const [fName, setFName] = useState(user.firstName);
        const [lName, setLName] = useState(user.lastName);
        const [email, setEmail] = useState(user.email);
        const [grade, setGrade] = useState(data.row.grade);
        const [pfName, setpFName] = useState(parent.firstName);
        const [plName, setpLName] = useState(parent.lastName);
        const [pEmail, setpEmail] = useState(parent.email);

        const onSubmit = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/v1/students/${id}`,
                    {
                        method: 'PATCH',
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
                            },
                            parent: {
                                firstName: pfName,
                                lastName: plName,
                                email: pEmail,
                            },
                            grade: grade,
                        }),
                    }
                );

                const json = await res.json();

                if (!json.success) throw new Error("Couldn't Submit Form");

                alert('Student Successfully Edited');
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
                        Edit Student
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
                                id='grade'
                                label='Grade'
                                placeholder='Grade'
                                type='number'
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                style={{ width: '100%' }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ width: '80%', margin: '0 auto' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '10px',
                            }}
                        >
                            <TextField
                                id='pfirstName'
                                variant='outlined'
                                label='Parent First Name'
                                placeholder='Parent First Name'
                                value={pfName}
                                onChange={(e) => setpFName(e.target.value)}
                                required
                            />
                            <TextField
                                id='plastName'
                                variant='outlined'
                                label='Parent Last Name'
                                placeholder='Parent Last Name'
                                value={plName}
                                onChange={(e) => setpLName(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <TextField
                                id='pemail'
                                variant='outlined'
                                label='Parent Email'
                                placeholder='Parent Email'
                                type='email'
                                value={pEmail}
                                onChange={(e) => setpEmail(e.target.value)}
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
