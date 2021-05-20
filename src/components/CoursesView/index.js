import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataView } from '../DataView';
import { CourseModal } from './CourseModal';
import { ROLES } from '../../utils/constants';
import { CourseEditModal } from './CourseEditModal';
import { CourseDeleteModal  } from './CourseDeleteModal';
import { useUserId } from '../../hooks';

const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    { field: 'name', headerName: 'Course Name', width: 175 },
    { field: 'maxCapacity', headerName: 'Max. Capacity', width: 175 },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 175,
        valueGetter: (params) => {
            const sd = new Date(params.row.startDate);
            return `${sd.getFullYear()}-${String(sd.getMonth() + 1).padStart(
                2,
                '0'
            )}-${String(sd.getDate()).padStart(2, '0')}`;
        },
    },
    {
        field: 'endDate',
        headerName: 'End Date',
        width: 175,
        valueGetter: (params) => {
            const ed = new Date(params.row.endDate);
            return `${ed.getFullYear()}-${String(ed.getMonth() + 1).padStart(
                2,
                '0'
            )}-${String(ed.getDate()).padStart(2, '0')}`;
        },
    },
    {
        field: 'teacherName',
        headerName: 'Teacher Name',
        width: 175,
        valueGetter: (params) =>
            `${params.row.teacher.user.lastName}, ${params.row.teacher.user.firstName}`,
    },
];

export const CoursesView = ({ role }) => {
    const [loading, setLoading] = useState(true);
    const userId = useUserId(role);

    useEffect(() => {
        if (userId != null) setLoading(false);
    }, [userId]);

    switch (role) {
        case ROLES.ADMIN:
            return (
                <DataView
                    dataURI={`${process.env.REACT_APP_API_URL}/api/v1/courses/`}
                    resTarget='courses'
                    columns={columns}
                    createRows
                    newModalBody={CourseModal}
                    editRows
                    editModalBody={CourseEditModal}
                    deleteRows
                    deleteModalBody={CourseDeleteModal}
                />
            );
        case ROLES.FACULTY:
            if (loading) return <></>;
            return (
                <DataView
                    dataURI={`${process.env.REACT_APP_API_URL}/api/v1/faculty/${userId}/courses`}
                    resTarget='courses'
                    columns={columns}
                />
            );

        default:
            return <>Forbidden</>;
    }
};

CoursesView.propTypes = {
    role: PropTypes.oneOf([ROLES.ADMIN, ROLES.FACULTY]).isRequired,
};
