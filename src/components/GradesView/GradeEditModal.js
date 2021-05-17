import React, { useState } from 'react';
import { Button, Input, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const GradeEditModal = React.forwardRef(({ data, dismiss }, ref) => {
    const [grade, setGrade] = useState(data.row.grade);
    const course = data.row.course.id;
    const student = data.row.student.id;

    const onSubmit = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/students/${student}/grade`,
                {
                    method: 'PATCH',
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

            // alert('Grade Edited Successfully');
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
                <div style={{ width: 'auto',
                    display:"flex",
                    justifyContent: "center",
                    alignItems: "center",}}>
                    <Input
                        style={{ width: 'auto', marginTop: '10px', marginRight:'40px' }}
                        id='grade'
                        type='number'
                        placeholder='Grade'
                        label='Grade'
                        defaultValue={grade}
                        onChange={(e) => setGrade(e.target.value)}
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
