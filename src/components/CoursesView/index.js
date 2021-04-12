import React from 'react';
import { DataView } from '../DataView';
import { CourseModal } from './CourseModal';

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
            ModalBody={CourseModal}
        />
    );
};
