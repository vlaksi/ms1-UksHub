import { useEffect, useState } from 'react';
import Users from '../../common/components/organisms/Admin/Users';
import { getUserById } from '../../common/services/useractivity/userService';

const Admin = () => {
    const [user, setUser] = useState();
    if (typeof window !== 'undefined') {
        var token = localStorage.getItem('token');
    }
    if (token) {
        var base64Payload = token.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');

        useEffect(async () => {
            setUser(await getUserById(payload.toString().split(',')[3].split(':')[1].split('}')[0]));
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
