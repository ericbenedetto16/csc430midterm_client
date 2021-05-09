import { useState, useEffect } from 'react';
import { userAuthenticated } from '../api/auth';
import { ROLES } from '../utils/constants';

export const useAuthentication = (roles) => {
    const [auth, setAuth] = useState({
        logged: null,
        role: null,
    });

    useEffect(() => {
        let cancelled = false;
        const f = async () => {
            const d = await userAuthenticated();
            if (!cancelled) {
                if (!d.success) {
                    setAuth({ logged: false, role: null });
                } else if (roles.has(d.user.role.roleName)) {
                    setAuth({ logged: true, role: d.user.role.roleName });
                } else {
                    setAuth({ logged: false, role: null });
                }
            }
        };
        f();
        return () => (cancelled = true);
    }, []);

    return auth;
};

export const useUserId = (role) => {
    let formattedRole = role;

    if (role === ROLES.STUDENT) {
        formattedRole = `${role}s`;
    }
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        let cancelled = false;
        const getUserId = async () => {
            const res = await userAuthenticated();
            const id = res.user.id;

            const faculty = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/${formattedRole}/`
            );
            const json = await faculty.json();

            if (!cancelled) {
                setUserId(
                    await json[formattedRole].filter(
                        ({ user }) => user.id === id
                    )[0].id
                );
            }
        };
        getUserId();
        return () => (cancelled = true);
    });

    return userId;
};

export const useUserCourses = (userId) => {
    const [courses, setCourses] = useState(null);
    useEffect(() => {
        if (userId === null) return;
        let cancelled = false;
        const f = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/v1/students/${userId}/courses`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            );
            const json = await res.json();
            if (!cancelled) setCourses(json.enrollments);
        };
        f();
        return () => (cancelled = true);
    }, [userId]);
    return courses;
};
