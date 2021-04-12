import { useState, useEffect } from 'react';
import { userAuthenticated } from '../api/auth';

export const useAuthentication = (role) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const f = async () => {
            const d = await userAuthenticated();
            if (!cancelled) {
                if (!d.success) {
                    setAuth(false);
                } else if (d.user.role.roleName === role) {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            }
        };
        f();
        return () => (cancelled = true);
    });
    return auth;
};
