import { useEffect, useState } from 'react';
import Users from '../../common/components/organisms/Admin/Users';
import { getParsedToken, getToken } from '../../common/services/authentication/token';
import { getUserById } from '../../common/services/useractivity/userService';

const Admin = () => {
    const [user, setUser] = useState();
    if (typeof window !== 'undefined') {
        var token = getToken();
    }
    if (token) {
        var parsedToken = getParsedToken();
        useEffect(async () => {
            setUser(await getUserById(parsedToken.user_id));
        }, []);
        if (user?.is_superuser === true && user?.is_staff === true) {
            return (
                <>
                    <Users></Users>
                </>
            );
        } else {
            return (
                <>
                    <h1>You don't have access rights.</h1>
                </>
            );
        }
    } else {
        return (
            <>
                <h1>You need to log in</h1>
            </>
        );
    }
};

export default Admin;
