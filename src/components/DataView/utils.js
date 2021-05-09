import { Button } from '@material-ui/core';

export const compileColumns = (
    data,
    cols,
    editRows,
    deleteRows,
    setId,
    setEdit,
    setDelete,
    setParams
) => {
    if (editRows && deleteRows) {
        // Return Cols w/ Edit & Delete
        return [
            ...cols,
            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                renderCell: (params) => {
                    return (
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setId(params.id);
                                setEdit(true);
                                setParams(params);
                            }}
                        >
                            Edit
                        </Button>
                    );
                },
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 100,
                renderCell: (params) => {
                    if (params.row.active !== undefined) {
                        if (params.row.active === false) {
                            return <>Deleted</>;
                        }
                    }
                    return (
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setId(params.id);
                                setDelete(true);
                                setParams(params);
                            }}
                        >
                            Delete
                        </Button>
                    );
                },
            },
        ];
    }

    if (editRows) {
        // Return Cols w/ Edit
        return [
            ...cols,
            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                renderCell: (params) => {
                    return (
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setId(params.id);
                                setEdit(true);
                                setParams(params);
                            }}
                        >
                            Edit
                        </Button>
                    );
                },
            },
        ];
    }

    if (deleteRows) {
        // Return Cols /w Delete
        return [
            ...cols,
            {
                field: 'delete',
                headerName: 'Delete',
                width: 100,
                renderCell: (params) => {
                    return (
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setId(params.id);
                                setDelete(true);
                                setParams(params);
                            }}
                        >
                            Delete
                        </Button>
                    );
                },
            },
        ];
    }

    return cols;
};
