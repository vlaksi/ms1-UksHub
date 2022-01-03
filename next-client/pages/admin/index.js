import { useRouter } from 'next/router';
import Users from '../../common/components/organisms/Admin/Users';

const Admin = () => {
    if (typeof window !== 'undefined') {
        var token = localStorage.getItem('token');
    }
    if (token) {
        return (
            <>
                <Users></Users>
            </>
        );
    } else {
        return (
            <>
                <h1>You need to log in</h1>
            </>
        );
    }
};

export default Admin;
