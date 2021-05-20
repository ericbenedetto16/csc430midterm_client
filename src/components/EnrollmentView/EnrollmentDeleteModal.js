import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const EnrollmentDeleteModal = React.forwardRef(
    ({ data, dismiss }, ref) => {
        const course = data.row.id;
        const student = data.userId;
        const onSubmit = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/v1/students/${student}/unenroll`,
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
                        }),
                    }
                );

                const json = await res.json();
                if (!json.success) throw new Error("Couldn't Submit Form");

                // alert('Course Dropped Successfully');
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
                        Drop Course
                    </Typography>
                    <div style={{ width: '80%', margin: '0 auto' }}>
                        <p>Are You Sure You Want to Drop this Course?</p>
                        <div style={{ display:"flex",
                    justifyContent: "center",
                    alignItems: "center",}}>
                        <Button
                            style={{ width: 'auto', marginTop: '10px', marginRight: '5px' }}
                            variant='contained'
                            color='secondary'
                            type='submit'
                        >
                            Drop
                        </Button>
                        <Button
                            style={{ width: 'auto', marginTop: '10px' }}
                            variant='contained'
                            color='primary'
                            onClick={() => dismiss()}
                        >
                            Cancel
                        </Button>

                    </div>

                        
                    </div>
                </div>
            </ModalTemplate>
        );
    }
);
