import { Button, Table } from 'react-bootstrap';

const BranchCommit = ({ commits }) => {
  return (
    <>
      <Table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {commits?.map((commit, index) => {
            return (
              <tr key={index}>
                <td>
                  <div>
                    <p style={{ fontSize: '14px' }}>{commit.message}</p>
                    <p>
                      {commit.author}, {commit.committed_date}
                    </p>
                  </div>
                </td>
                <td align="right">
                  <Button variant="success">View commit {commit.hash}</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BranchCommit;
