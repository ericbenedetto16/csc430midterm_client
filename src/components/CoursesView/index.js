import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton, Modal } from '@material-ui/core';
import { DataView } from '../DataView';

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
    return (
        <DataView
            dataURI={`${process.env.REACT_APP_API_URL}/api/v1/courses/`}
            resTarget='courses'
            columns={columns}
            ModalBody={<></>}
        />
    );
};
