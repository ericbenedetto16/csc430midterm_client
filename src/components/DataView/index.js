import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton, Modal } from '@material-ui/core';

export const DataView = ({ dataURI, resTarget, columns, ModalBody }) => {
    const [loading, setLoading] = useState(false);
    const [data, setStudents] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const f = async () => {
            try {
                const data = await fetch(dataURI);

                const json = await data.json();

                if (!json.success) throw new Error("Couldn't Get Data");

                setStudents(json[resTarget]);
                setLoading(false);
            } catch (err) {
                alert('Error Fetching Data');
                setLoading(false);
            }
        };
        f();
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    <DataGrid rows={data} columns={columns} pageSize={5} />
                    <IconButton
                        aria-label='add'
                        edge='end'
                        size='medium'
                        style={{
                            width: '50px',
                            height: '50px',
                            position: 'absolute',
                            right: '30px',
                        }}
                        onClick={() => setModal(true)}
                    >
                        <AddCircleIcon
                            color='primary'
                            style={{ width: '50px', height: '50px' }}
                        />
                    </IconButton>
                    <Modal
                        open={modal}
                        onClose={() => setModal(false)}
                        aria-labelledby='simple-modal-title'
                        aria-describedby='simple-modal-description'
                    >
                        <ModalBody dismiss={() => setModal(false)} />
                    </Modal>
                </>
            )}
        </div>
    );
};

DataView.propTypes = {
    dataURI: PropTypes.string.isRequired,
    resTarget: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    ModalBody: PropTypes.node.isRequired,
};
