import React, { useState } from 'react';
import { Button, Input, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const GradeModal = React.forwardRef(({ data, dismiss }, ref) => {
    const [grade, setGrade] = useState('');
    const course = data.row.course.id;
    const student = data.row.student.id;

    const onSubmit = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/students/${student}/grade`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                    body: JSON.stringify({
                        course,
                        grade: parseInt(grade),
                    }),
                }
            );

            const json = await res.json();
            if (!json.success) throw new Error("Couldn't Submit Form");

            alert('Grade Submitted Successfully');
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
                    Submit Grade
                </Typography>
                <div style={{ width: '80%', margin: '0 auto' }}>
                    <Input
                        style={{ width: '100%', marginTop: '10px' }}
                        id='grade'
                        type='number'
                        placeholder='Grade'
                        label='Grade'
                        onChange={(e) => setGrade(e.target.value)}
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
