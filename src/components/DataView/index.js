import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import { AddButton } from './AddButton';
import { compileColumns } from './utils';
import { Modal } from '@material-ui/core';

export const DataView = ({
    dataURI,
    resTarget,
    columns,
    createRows,
    editRows,
    deleteRows,
    newModalBody,
    columnHandler,
    editModalBody: EditModalBody,
    deleteModalBody: DeleteModalBody,
}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [deleting, setDelete] = useState(false);
    const [id, setId] = useState(null);
    const [params, setParams] = useState({});

    useEffect(() => {
        const f = async () => {
            try {
                const access_token = localStorage.getItem('access_token');

                const data = await fetch(dataURI, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                const json = await data.json();

                if (!json.success) throw new Error("Couldn't Get Data");

                setData(json[resTarget]);
                setLoading(false);
            } catch (err) {
                alert('Error Fetching Data');
                setLoading(false);
            }
        };
        f();
    }, []);

    const columnFunc = columnHandler ? columnHandler : compileColumns;

    return (
        <div style={{ height: 400, width: '100%' }}>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    <DataGrid
                        rows={data}
                        columns={columnFunc(
                            data,
                            columns,
                            editRows,
                            deleteRows,
                            setId,
                            setEdit,
                            setDelete,
                            setParams
                        )}
                        pageSize={5}
                    />
                    {editRows ? (
                        <Modal
                            open={edit}
                            onClose={() => setEdit(false)}
                            aria-labelledby='simple-modal-title'
                            aria-describedby='simple-modal-description'
                        >
                            <EditModalBody
                                id={id}
                                data={params}
                                dismiss={() => setEdit(false)}
                            />
                        </Modal>
                    ) : (
                        []
                    )}
                    {deleteRows ? (
                        <Modal
                            open={deleting}
                            onClose={() => setDelete(false)}
                            aria-labelledby='simple-modal-title'
                            aria-describedby='simple-modal-description'
                        >
                            <DeleteModalBody
                                id={id}
                                data={params}
                                dismiss={() => setDelete(false)}
                            />
                        </Modal>
                    ) : (
                        []
                    )}

                    <AddButton
                        createRows={createRows}
                        modalBody={newModalBody}
                    />
                </>
            )}
        </div>
    );
};

DataView.propTypes = {
    dataURI: PropTypes.string.isRequired,
    resTarget: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    columnHandler: PropTypes.func,
    createRows: PropTypes.bool,
    editRows: PropTypes.bool,
    deleteRows: PropTypes.bool,
    newModalBody: (props, propName) => {
        if (props['createRows'] === true && props[propName] === undefined) {
            return new Error(
                'createRows was provided as true, but no modal was supplied.'
            );
        }
    },
    editModalBody: (props, propName) => {
        if (props['editRows'] === true && props[propName] === undefined) {
            return new Error(
                'editRows was provided as true, but no modal was supplied.'
            );
        }
    },
    deleteModalBody: (props, propName) => {
        if (props['deleteRows'] === true && props[propName] === undefined) {
            return new Error(
                'deleteRows was provided as true, but no modal was supplied.'
            );
        }
    },
};

DataView.defaultProps = {
    createRows: false,
    editRows: false,
    deleteRows: false,
    columnHandler: undefined,
    newModalBody: undefined,
    editModalBody: undefined,
    deleteModalBody: undefined,
};
