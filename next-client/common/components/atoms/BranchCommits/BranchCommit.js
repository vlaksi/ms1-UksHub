import { Button, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';

const BranchCommit = ({ commits }) => {
  const [show, setShow] = useState(false);
  const [commit, setCommit] = useState('');

  const handleShow = (commit) => {
    setShow(true);
    setCommit(commit);
  };

  const handleClose = () => {
    setShow(false);
    setCommit('');
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Commit details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Files affected by this commit: <br /> {commit.files}
          </p>
          <p>
            Total: <br /> {commit.total}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

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
                  <Button
                    variant="success"
                    onClick={() => {
                      handleShow(commit);
                    }}
                  >
                    View commit {commit.hash}
                  </Button>
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
