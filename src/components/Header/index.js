import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
    Divider,
    Drawer,
    Link,
    List,
    ListItem,
    MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export const Header = () => {
    const history = useHistory();
    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);

    const LINKS = [
        { name: 'Home', href: '/' },
        { name: 'Students', href: '/students/all' },
        { name: 'Faculty', href: '/faculty/all' },
        { name: 'Courses', href: '/courses/all' },
    ];

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                    onClick={() => setDrawer((curr) => !curr)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor='left'
                    open={drawer}
                    onClose={() => setDrawer(false)}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        {LINKS.map(({ name, href }) => (
                            <ListItem key={name}>
                                <Link
                                    component={RouterLink}
                                    to={href}
                                    color='inherit'
                                    key={name}
                                    className={classes.drawerNavItem}
                                    onClick={() => setDrawer(false)}
                                >
                                    <MenuItem className={classes.navLabel}>
                                        {name}
                                    </MenuItem>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Typography variant='h6' className={classes.title}>
                    SchoolSystem
                </Typography>
                <Button
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
            </Toolbar>
        </AppBar>
    );
};
