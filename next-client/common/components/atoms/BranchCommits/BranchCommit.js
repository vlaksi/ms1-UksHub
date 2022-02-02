import { Button, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';

const BranchCommit = ({ commits }) => {
  const [show, setShow] = useState(false);
  const [commit, setCommit] = useState('');
  const [files, setFiles] = useState([]);
  const [total, setTotal] = useState([]);

  const handleShow = (commit) => {
    setShow(true);
    setCommit(commit);
    var commitFiles = commit.files;
    var files = commitFiles.substring(1, commitFiles.length - 1);
    var allFiles = [];
    files.split(', ').map(function (file, index) {
      allFiles.push(file.substring(1, file.length - 1));
    });
    setFiles(allFiles);
    var commitTotal = commit.total;
    var total = commitTotal.substring(1, commitTotal.length - 1);
    var totals = [];
    total.split(', ').map(function (t, index) {
      var tot = '';
      t.split(': ').map(function (item, index) {
        tot += index == 0 ? item.substring(1, item.length - 1) : ': ' + item;
      });
      totals.push(tot);
    });
    setTotal(totals);
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
            Files affected by this commit: <br />
            <ul>
              {files?.map((file, index) => {
                return <li>{file}</li>;
              })}
            </ul>
          </p>
          <p>
            Total: <br />
            <ul>
              {total?.map((item, index) => {
                return <li>{item}</li>;
              })}
            </ul>
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
