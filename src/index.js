import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Login } from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdminRoute } from './components/AdminRoute';
import { StudentRoute } from './components/StudentRoute';
import { FacultyRoute } from './components/FacultyRoute';
import { FacultyView } from './components/FacultyView';
import { Landing } from './components/Landing';
import { CoursesView } from './components/CoursesView';
import { GradesView } from './components/GradesView';
import { StudentsView } from './components/StudentsView';
import { EvaluationsView } from './components/EvaluationsView';
import { EnrollmentView } from './components/EnrollmentView';
import { ProtectedRoute } from './components/ProtectedRoute';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/login' component={Login} exact />
            <ProtectedRoute path='/' component={Landing} exact />
            <AdminRoute path='/faculty/all' component={FacultyView} exact />
            <AdminRoute path='/students/all' component={StudentsView} exact />
            <AdminRoute path='/courses/all' component={CoursesView} exact />
            <AdminRoute
                path='/evaluations/all'
                component={EvaluationsView}
                exact
            />

            <StudentRoute path='/enroll' component={EnrollmentView} exact />
            <StudentRoute
                path='/evaluations/create'
                component={EvaluationsView}
                exact
            />
            <StudentRoute path='/grades/view' component={GradesView} exact />

            <FacultyRoute
                path='/courses/teaching'
                component={CoursesView}
                exact
            />
            <FacultyRoute path='/grades/assign' component={GradesView} exact />
            <FacultyRoute
                path='/evaluations/view'
                component={EvaluationsView}
                exact
            />
            <Login />
        </Switch>
    </Router>,
    document.getElementById('root')
);
