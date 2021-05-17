import React, { useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const AddButton = ({ createRows, modalBody: ModalBody }) => {
    const [modal, setModal] = useState(false);

    if (!createRows) return <></>;

    return (
        <>
            <Button
                variant='contained'
                color='primary'
                size='medium'
                style={{
                    position: 'absolute',
                    right: '50px',
                }}
                onClick={() => setModal(true)}
            >
                Add New
            </Button>
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
