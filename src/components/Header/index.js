import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Button from '@material-ui/core/Button';

import { Link as RouterLink, useHistory } from 'react-router-dom';

import { ROLES } from '../../utils/constants';


export const Header = ({ role }) => {
    const history = useHistory();
    const [value, setValue] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const TABS = new Map([
        [
            ROLES.ADMIN,
            [
                { name: 'Home', href: '/' },
                { name: 'Students', href: '/students/all' },
                { name: 'Faculty', href: '/faculty/all' },
                { name: 'Courses', href: '/courses/all' },
                { name: 'Evaluations', href: '/evaluations/all' },
            ],
        ],
        [
            ROLES.STUDENT,
            [
                { name: 'Manage Courses', href: '/enroll' },
                { name: 'Evaluations', href: '/evaluations/create' },
                { name: 'Grades', href: '/grades/view' },
            ],
        ],
        [
            ROLES.FACULTY,
            [
                { name: 'My Courses', href: '/courses/teaching' },
                { name: 'Assign Grades', href: '/grades/assign' },
                { name: 'My Evaluations', href: '/evaluations/view' },
            ],
        ],
    ]);

    return (
        <AppBar position='static'>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs">
                        {TABS.get(role).map(({ name, href }) => (
                                <Tab
                                    component={RouterLink}
                                    to={href}
                                    label={name}
                                />       
                        ))}
                   <Button style={{position: 'absolute', top: '5px', right:'10px'}}
                    color='inherit'
                    onClick={async () => {
                        try {
                            localStorage.removeItem('access_token');
                            history.push('/login');
                        } catch (err) {
                            alert('Error Logging Out!');
                        }
                    }}
                >
                    Logout
                </Button>

                
                    
            </Tabs>
            
        </AppBar>  
        
    );
};


Header.propTypes = {
    role: PropTypes.oneOf(Object.values(ROLES)).isRequired,
};
