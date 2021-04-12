import React from 'react';

export const ModalTemplate = (props, ref) => {
    const { dismiss, onSubmit, children } = props;

    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={() => {
                dismiss();
            }}
        >
            <form
                style={{
                    width: '600px',
                    height: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={async (e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                {children}
            </form>
        </div>
    );
};
