
import Link from 'next/link';

const SearchListOfUsers = ({ listUsers }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {listUsers?.map((user, index) => {
          return (
            <Link href={`/${user.pk}/`}>
              <tr key={user.pk}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            </Link>

          );
        })}
      </tbody>
    </table >
  );
};

export default SearchListOfUsers;
