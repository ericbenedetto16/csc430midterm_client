import { Button } from '@material-ui/core';

export const gradeColumnHandler = (
    data,
    cols,
    assignGradeRows,
    editGradeRows,
    setId,
    setAssign,
    setEdit,
    setParams,
    userId
) => {
    // Return Cols w/ Enroll & Drop
    return [
        ...cols,
        {
            field: 'enroll',
            headerName: 'Grade',
            width: 150,
            renderCell: (params) => {
                if (params.row.grade !== null) {
                    return (
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setId(params.id);
                                setEdit(true);
                                setParams({ ...params, userId });
                            }}
                        >
                            Edit
                        </Button>
                    );
                }

                return (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            setId(params.id);
                            setAssign(true);
                            setParams({ ...params, userId });
                        }}
                    >
                        Grade
                    </Button>
                );
            },
        },
    ];
};
