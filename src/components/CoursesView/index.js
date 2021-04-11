import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';

const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    { field: 'name', headerName: 'Course Name', width: 175 },
    {
        field: 'teacherName',
        headerName: 'Teacher Name',
        width: 175,
        valueGetter: (params) =>
            `${params.row.teacher.user.lastName}, ${params.row.teacher.user.firstName}`,
    },
];

export const CoursesView = () => {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const f = async () => {
            try {
                const data = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/v1/courses/`
                );

                const json = await data.json();

                if (!json.success) throw new Error("Couldn't Get Courses");

                setCourses(json.courses);
                setLoading(false);
            } catch (err) {
                alert('Error Fetching Courses');
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
                    <DataGrid rows={courses} columns={columns} pageSize={5} />
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
