import { useEffect, useState } from 'react';
import { Button, Modal, Form, Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';
import { MdAddCircle } from 'react-icons/md';
import { AiFillHome, AiOutlineFile } from 'react-icons/ai';
import styles from './RepositoryCode.module.scss';

import { getBranchCommit } from '../../../../services/versioning/repositoryService';

const RepositoryCode = ({ repository, repositoryBranches, isLoggedInUserCollaborator }) => {
  const [show, setShow] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [activeBranch, setActiveBranch] = useState();
  const [activeFolders, setActiveFolders] = useState([]);
  const [activeFiles, setActiveFiles] = useState([]);
  const [activeFilesPath, setActiveFilesPath] = useState([]);

  const setCurrentBrach = async (branch) => {
    setActiveBranch(branch);
    console.log(branch.pk);
    var x = await getBranchCommit(branch.pk);
    console.log(x);
    // setActiveFolders(x);
    // setActiveFolders(await getBranchFolders(branch.pk));
    // setActiveFiles(await getBranchFiles(branch.pk));
  };

  const showAddBranch = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setNewBranchName('');
  };

  const handleBranchNameChange = (newBranchName) => {
    setNewBranchName(newBranchName);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Branch name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter branch name"
                value={newBranchName}
                onChange={(e) => {
                  handleBranchNameChange(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              addBranch();
            }}
          >
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Header>
          <div className={styles.repositoryHeader}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {activeBranch?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {repositoryBranches.map((branch) => {
                    return (
                      <Dropdown.Item
                        key={branch.name}
                        onClick={() => {
                          setCurrentBrach(branch);
                        }}
                      >
                        {branch.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <div className={styles.filesPath}>
                {activeFilesPath.map((activePath, idx) => {
                  return (
                    <p key={activePath}>
                      {idx === 0 ? '' : '/'} {activePath}
                    </p>
                  );
                })}
              </div>
            </div>
            {isLoggedInUserCollaborator && (
              <div>
                <Button variant="outline-primary" onClick={showAddBranch}>
                  {' '}
                  <MdAddCircle size={24} /> Add new branch
                </Button>
              </div>
            )}

            <div>
              <AiFillHome
                onClick={() => {
                  setActiveFolders(activeBranch?.folders);
                  setActiveFiles(activeBranch?.files);
                  setActiveFilesPath([]);
                }}
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                  height: '20px',
                  width: '20px',
                }}
              />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {activeFolders?.map((folder) => {
              return (
                <ListGroup.Item key={folder.name} onClick={() => {}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsFillFolderFill style={{ marginRight: '8px' }} />
                    {folder.name}
                  </div>
                </ListGroup.Item>
              );
            })}
            {activeFiles?.map((file) => {
              return (
                <ListGroup.Item
                  action
                  key={file.name}
                  onClick={() => {
                    alert(file.name);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AiOutlineFile style={{ marginRight: '8px' }} /> {file.name}
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className={styles.repositoryFooter}>2 days ago</div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default RepositoryCode;
