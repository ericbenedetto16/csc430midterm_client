import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ROLES } from '../../utils/constants';
import { DataView } from '../DataView';
import { EvaluationModal } from './EvaluationModal';
import { useUserId } from '../../hooks';

const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    {
        field: 'student_id',
        headerName: 'Student',
        width: 175,
        valueGetter: (params) =>
            `${params.row.student.user.firstName} ${params.row.student.user.lastName}`,
    },
    {
        field: 'teacher_id',
        headerName: 'Teacher',
        width: 175,
        valueGetter: (params) =>
            `${params.row.teacher.user.firstName} ${params.row.teacher.user.lastName}`,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 175,
    },
];

export const EvaluationsView = ({ role }) => {
    const [loading, setLoading] = useState(true);
    let userId = useUserId(role);

    useEffect(() => {
        if (userId != null) setLoading(false);
    }, [userId]);

    switch (role) {
        case ROLES.ADMIN:
            return (
                <DataView
                    dataURI={`${process.env.REACT_APP_API_URL}/api/v1/evaluations/`}
                    resTarget='evaluations'
                    columns={columns}
                />
            );
        case ROLES.FACULTY:
            if (loading) return <></>;

            return (
                <DataView
                    dataURI={`${process.env.REACT_APP_API_URL}/api/v1/faculty/${userId}/evaluations/`}
                    resTarget='evaluations'
                    columns={columns}
                />
            );
        case ROLES.STUDENT:
            return (
                <DataView
                    dataURI={`${process.env.REACT_APP_API_URL}/api/v1/evaluations/`}
                    resTarget='evaluations'
                    columns={columns}
                    createRows
                    newModalBody={EvaluationModal}
                />
            );
        default:
            return <></>;
    }
};

EvaluationsView.propTypes = {
    role: PropTypes.oneOf(Object.values(ROLES)).isRequired,
};
