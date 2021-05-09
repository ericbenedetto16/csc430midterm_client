import React, { useState } from 'react';
import { IconButton, Modal } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const AddButton = ({ createRows, modalBody: ModalBody }) => {
    const [modal, setModal] = useState(false);

    if (!createRows) return <></>;

    return (
        <>
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
    );
};
