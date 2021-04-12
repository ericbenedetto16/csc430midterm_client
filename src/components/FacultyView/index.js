import React from 'react';
import { DataView } from '../DataView';
import { FacultyModal } from './FacultyModal';
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
    return (
        <DataView
            dataURI={`${process.env.REACT_APP_API_URL}/api/v1/faculty/`}
            resTarget='faculty'
            columns={columns}
            ModalBody={FacultyModal}
        />
    );
};
