import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';

const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        valueGetter: (params) => `${params.row.user.firstName}`,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
        valueGetter: (params) => `${params.row.user.lastName}`,
    },
    {
        field: 'email',
        headerName: 'E-Mail',
        width: 250,
        valueGetter: (params) => `${params.row.user.email}`,
    },
    { field: 'grade', headerName: 'Grade', width: 100 },
];

export const StudentsView = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const f = async () => {
            try {
                const data = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/v1/students/`
                );

                const json = await data.json();

                if (!json.success) throw new Error("Couldn't Get Students");

                setStudents(json.students);
                setLoading(false);
            } catch (err) {
                alert('Error Fetching Students');
                setLoading(false);
            }
        };
        f();
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    <DataGrid rows={students} columns={columns} pageSize={5} />
                    <IconButton
                        aria-label='add'
                        edge='end'
                        size='medium'
                        style={{
                            width: '50px',
                            height: '50px',
                            position: 'absolute',
                            right: '30px',
                        }}
                        onClick={() => alert("Let's Make a New Record")}
                    >
                        <AddCircleIcon
                            color='primary'
                            style={{ width: '50px', height: '50px' }}
                        />
                    </IconButton>
                </>
            )}
        </div>
    );
};
