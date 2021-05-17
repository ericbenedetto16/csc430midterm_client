import React, { useState, useEffect } from 'react';
import { Button, Input, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const CourseModal = React.forwardRef(({ dismiss }, ref) => {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [teacher, setTeacher] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');

    const history = useHistory();

    useEffect(() => {
        const f = async () => {
            try {
                const data = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/v1/faculty/`
                );

                const json = await data.json();

                if (!json.success) throw new Error("Couldn't Load Data");

                setFaculty(json.faculty);
                setLoading(false);
            } catch (err) {
                alert('Error Loading Data');
                history.push('/');
            }
        };
        f();
    }, []);

    const onSubmit = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/courses/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                    body: JSON.stringify({
                        teacher: teacher,
                        name: title,
                        maxCapacity,
                        startDate,
                        endDate,
                    }),
                }
            );

            const json = await res.json();
            if (!json.success) throw new Error("Couldn't Submit Form");

            // alert('Course Successfully Created');
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
                    Create New Course
                </Typography>
                <div style={{ width: '80%', margin: '0 auto' }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Autocomplete
                            id='teacherSelector'
                            options={faculty}
                            getOptionLabel={(option) =>
                                `${option.user.firstName} ${option.user.lastName}`
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Teacher'
                                    placeholder='Teacher'
                                    required
                                    variant='outlined'
                                />
                            )}
                            onChange={(e, v) => setTeacher(v.user.id)}
                            style={{ marginBottom: '10px' }}
                        />
                    )}
                    <TextField
                        id='courseName'
                        variant='outlined'
                        label='Course Name'
                        placeholder='Course Name'
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    <Input
                        type='number'
                        id='maxCapacity'
                        label='Max Capacity'
                        placeholder='Max Capacity'
                        onChange={(e) => setMaxCapacity(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    

                    <TextField
                        type='date'
                        id='startDate'
                        label='Start Date'
                        placeholder='Start Date'
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        style={{ width: 'auto', marginBottom: '10px', marginLeft: '30px'  }}
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    <TextField
                        type='date'
                        id='endDate'
                        label='End Date'
                        placeholder='End Date'
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        style={{ width: 'auto', marginBottom: '10px', marginLeft:'50px' }}
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />

                    <Button
                        style={{ width: 'auto', marginTop: '10px' }}
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
