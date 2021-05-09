import { Button } from '@material-ui/core';

export const enrollmentColumnHandler = (
    data,
    cols,
    enrollRows,
    dropRows,
    setId,
    setEnroll,
    setDrop,
    setParams,
    userId,
    userCourses
) => {
    // Return Cols w/ Enroll & Drop
    return [
        ...cols,
        {
            field: 'enroll',
            headerName: 'Enroll',
            width: 100,
            renderCell: (params) => {
                if (
                    userCourses.filter(
                        ({ course: { id } }) => params.row.id === id
                    ).length > 0
                ) {
                    return <>Enrolled</>;
                }

                return (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            setId(params.id);
                            setEnroll(true);
                            setParams({ ...params, userId });
                        }}
                    >
                        Enroll
                    </Button>
                );
            },
        },
        {
            field: 'drop',
            headerName: 'Drop',
            width: 100,
            renderCell: (params) => {
                if (
                    userCourses.filter(
                        ({ course: { id } }) => params.row.id === id
                    ).length > 0
                ) {
                    return (
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setId(params.id);
                                setDrop(true);
                                setParams({ ...params, userId });
                            }}
                        >
                            Drop
                        </Button>
                    );
                }
                return <>Not Enrolled</>;
            },
        },
    ];
};
