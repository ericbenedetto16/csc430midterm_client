import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton, Modal } from '@material-ui/core';
import { DataView } from '../DataView';

const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    {
        field: 'studentName',
        headerName: 'Student',
        width: 175,
        valueGetter: (params) =>
            `${params.row.teacher.user.lastName}, ${params.row.teacher.user.firstName}`,
    },
    {
        field: 'teacherName',
        headerName: 'Teacher',
        width: 175,
        valueGetter: (params) =>
            `${params.row.student.user.lastName}, ${params.row.student.user.firstName}`,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 175,
    },
];

export const EvaluationsView = () => {
    return (
        <DataView
            dataURI={`${process.env.REACT_APP_API_URL}/api/v1/evaluations/`}
            resTarget='evaluations'
            columns={columns}
            ModalBody={<></>}
        />
    );
};
