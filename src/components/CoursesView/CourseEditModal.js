import React, { useState, useEffect } from 'react';
import { Button, Input, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const CourseEditModal = React.forwardRef(
    ({ id, data, dismiss }, ref) => {
        const sd = new Date(data.row.startDate);
        const ed = new Date(data.row.endDate);
        const [faculty, setFaculty] = useState([]);
        const [loading, setLoading] = useState(true);
        const [title, setTitle] = useState(data.row.name);
        const [teacher, setTeacher] = useState(data.row.teacher);
        const [startDate, setStartDate] = useState(
            `${sd.getFullYear()}-${String(sd.getMonth() + 1).padStart(
                2,
                '0'
            )}-${String(sd.getDate()).padStart(2, '0')}`
        );
        const [endDate, setEndDate] = useState(
            `${ed.getFullYear()}-${String(ed.getMonth() + 1).padStart(
                2,
                '0'
            )}-${String(ed.getDate()).padStart(2, '0')}`
        );
        const [maxCapacity, setMaxCapacity] = useState(data.row.maxCapacity);

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
                    `${process.env.REACT_APP_API_URL}/api/v1/courses/${id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'access_token'
                            )}`,
                        },
                        body: JSON.stringify({
                            teacher: teacher.user.id,
                            name: title,
                            startDate,
                            endDate,
                            maxCapacity,
                        }),
                    }
                );

                const json = await res.json();
                if (!json.success) throw new Error("Couldn't Submit Form");

                alert('Course Successfully Created');
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
                                getOptionSelected={(option) =>
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
                                value={teacher}
                                onChange={(e, v) => setTeacher(v)}
                                style={{ marginBottom: '10px' }}
                            />
                        )}
                        <TextField
                            id='courseName'
                            variant='outlined'
                            label='Course Name'
                            placeholder='Course Name'
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <Input
                            type='number'
                            id='maxCapacity'
                            label='Max Capacity'
                            placeholder='Max Capacity'
                            defaultValue={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                            required
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <Input
                            type='date'
                            id='startDate'
                            label='Start Date'
                            placeholder='Start Date'
                            defaultValue={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <Input
                            type='date'
                            id='endDate'
                            label='End Date'
                            placeholder='End Date'
                            defaultValue={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            style={{ width: '100%', marginBottom: '10px' }}
                        />

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
