import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Login } from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdminRoute } from './components/AdminRoute';
import { FacultyView } from './components/FacultyView';
import { Landing } from './components/Landing';
import { CoursesView } from './components/CoursesView';
import { StudentsView } from './components/StudentsView';
import { EvaluationsView } from './components/EvaluationsView';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/login' component={Login} exact />
            <AdminRoute path='/' component={Landing} exact />
            <AdminRoute path='/faculty/all' component={FacultyView} exact />
            <AdminRoute path='/students/all' component={StudentsView} exact />
            <AdminRoute path='/courses/all' component={CoursesView} exact />
            <AdminRoute
                path='/evaluations/all'
                component={EvaluationsView}
                exact
            />

            <Login />
        </Switch>
    </Router>,
    document.getElementById('root')
);
