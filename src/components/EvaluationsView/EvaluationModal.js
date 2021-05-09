import React, { useState, useEffect } from 'react';
import { Button, Input, TextField, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const EvaluationModal = React.forwardRef(({ dismiss }, ref) => {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teacher, setTeacher] = useState('');
    const [rating, setRating] = useState('');

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
                `${process.env.REACT_APP_API_URL}/api/v1/evaluations/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                    body: JSON.stringify({
                        teacher,
                        rating: parseInt(rating),
                    }),
                }
            );

            const json = await res.json();
            if (!json.success) throw new Error("Couldn't Submit Form");

            alert('Evaluation Successfully Created');
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
                            onChange={(e, v) => setTeacher(v.id)}
                            style={{ marginBottom: '10px' }}
                        />
                    )}

                    <Input
                        type='number'
                        id='rating'
                        label='Rating'
                        placeholder='Rating'
                        onChange={(e) => setRating(e.target.value)}
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
});
