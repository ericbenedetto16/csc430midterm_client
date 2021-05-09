import React, { useState, useEffect } from 'react';
import { useUserCourses, useUserId } from '../../hooks';
import { ROLES } from '../../utils/constants';
import { DataView } from '../DataView';
import { enrollmentColumnHandler } from './utils';
import { EnrollmentModal } from './EnrollmentModal';
import { EnrollmentDeleteModal } from './EnrollmentDeleteModal';

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

export const EnrollmentView = () => {
    const [loading, setLoading] = useState(true);
    const userId = useUserId(ROLES.STUDENT);
    const userCourses = useUserCourses(userId);

    useEffect(() => {
        if (userId && userCourses) setLoading(false);
    }, [userId, userCourses]);

    if (loading) return <></>;
    return (
        <DataView
            dataURI={`${process.env.REACT_APP_API_URL}/api/v1/courses/`}
            resTarget='courses'
            columns={columns}
            columnHandler={(...args) =>
                enrollmentColumnHandler(...args, userId, userCourses)
            }
            editRows
            editModalBody={EnrollmentModal}
            deleteRows
            deleteModalBody={EnrollmentDeleteModal}
        />
    );
};
