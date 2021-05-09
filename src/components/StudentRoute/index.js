import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuthentication } from '../../hooks';
import { ROLES } from '../../utils/constants';
import { Header } from '../Header';

export const StudentRoute = ({ component: Component, ...rest }) => {
    const { logged, role } = useAuthentication(new Set([ROLES.STUDENT]));

    return (
        <Route
            {...rest}
            render={(props) => {
                if (logged === true) {
                    return (
                        <>
                            <Header role={role} />
                            <Component role={role} {...props} />
                        </>
                    );
                }
                if (logged === false) {
                    return <Redirect to={'/login'} />;
                }
            }}
        />
    );
};

StudentRoute.propTypes = {
    component: PropTypes.func,
};
