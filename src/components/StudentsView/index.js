import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton, Modal } from '@material-ui/core';
import { DataView } from '../DataView';
import { StudentModal } from './StudentModal';

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
    return (
        <DataView
            dataURI={`${process.env.REACT_APP_API_URL}/api/v1/students/`}
            resTarget='students'
            columns={columns}
            ModalBody={StudentModal}
        />
    );
};
