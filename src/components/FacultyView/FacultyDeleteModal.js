import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { ModalTemplate } from '../ModalTemplate';

export const FacultyDeleteModal = React.forwardRef(({ id, dismiss }, ref) => {
    const onSubmit = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/faculty/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            );

            const json = await res.json();

            if (!json.success) throw new Error("Couldn't Submit Form");

            alert('Faculty Successfully Deleted');
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
                    Delete Faculty
                </Typography>
                <p style={{ textAlign: 'center' }}>
                    Are you sure you want to delete this record? This action
                    cannot be undone.
                </p>
                <Button
                    style={{ width: '100%', marginTop: '10px' }}
                    variant='contained'
                    color='secondary'
                    type='submit'
                >
                    Delete
                </Button>
                <Button
                    style={{ width: '100%', marginTop: '10px' }}
                    variant='contained'
                    color='primary'
                    onClick={() => dismiss()}
                >
                    Cancel
                </Button>
            </div>
        </ModalTemplate>
    );
});
