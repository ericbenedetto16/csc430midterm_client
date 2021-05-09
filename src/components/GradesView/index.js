import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ROLES } from '../../utils/constants';
import { DataView } from '../DataView';
import { useUserId } from '../../hooks';
import { gradeColumnHandler } from './utils';
import { GradeModal } from './GradeModal';
import { GradeEditModal } from './GradeEditModal';

const columns = [
    {
        field: 'name',
        headerName: 'Course Name',
        width: 175,
        valueGetter: (params) => {
            return params.row.course.name;
        },
    },
    {
        field: 'studentName',
        headerName: 'Student Name',
        width: 175,
        valueGetter: (params) => {
            return `${params.row.student.user.firstName} ${params.row.student.user.lastName}`;
        },
    },
    {
        field: 'grade',
        headerName: 'Grade',
        width: 150,
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 175,
        valueGetter: (params) => {
            const sd = new Date(params.row.course.startDate);
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
            const ed = new Date(params.row.course.endDate);
            return `${ed.getFullYear()}-${String(ed.getMonth() + 1).padStart(
                2,
                '0'
            )}-${String(ed.getDate()).padStart(2, '0')}`;
        },
    },
];

// For a Student, Loop
export const GradesView = ({ role }) => {
    const [loading, setLoading] = useState(true);
    const userId = useUserId(role);

    useEffect(() => {
        if (userId && userId !== null) setLoading(false);
    }, [userId]);

    if (loading) return <></>;

    switch (role) {
        case ROLES.FACULTY:
            return (
                <DataView
                    dataURI={`${process.env.REACT_APP_API_URL}/api/v1/faculty/${userId}/students`}
                    resTarget='enrollments'
                    columns={columns}
                    columnHandler={(...args) =>
                        gradeColumnHandler(...args, userId)
                    }
                    editRows
                    editModalBody={GradeModal}
                    deleteRows
                    deleteModalBody={GradeEditModal}
                />
            );
        case ROLES.STUDENT:
            return (
                <DataView
                    dataURI={`${process.env.REACT_APP_API_URL}/api/v1/students/${userId}/courses`}
                    resTarget='enrollments'
                    columns={columns}
                />
            );
        default:
            return <>Forbidden</>;
    }
};

GradesView.propTypes = {
    role: PropTypes.oneOf([ROLES.FACULTY, ROLES.STUDENT]).isRequired,
};
