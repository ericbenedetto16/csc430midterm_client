import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';

const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 175,
        valueGetter: (params) => params.row.user.firstName,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 175,
        valueGetter: (params) => params.row.user.lastName,
    },
    {
        field: 'salary',
        headerName: 'Salary',
        width: 175,
        valueGetter: (params) =>
            `$${Number(params.row.salary).toLocaleString()}`,
    },
    {
        field: 'active',
        headerName: 'Active',
        width: 175,
    },
];

export const FacultyView = () => {
    const [loading, setLoading] = useState(false);
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const f = async () => {
            try {
                const data = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/v1/faculty/`
                );

                const json = await data.json();

                if (!json.success) throw new Error("Couldn't Get Faculty");

                setFaculty(json.faculty);
                setLoading(false);
            } catch (err) {
                alert('Error Fetching Faculty');
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
                    <DataGrid rows={faculty} columns={columns} pageSize={5} />
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
