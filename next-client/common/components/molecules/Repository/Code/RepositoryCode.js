import { useEffect, useState } from 'react';
import { Button, Modal, Form, Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';
import { MdAddCircle } from 'react-icons/md';
import { AiFillHome, AiOutlineFile } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import styles from './RepositoryCode.module.scss';

import { getBranchCommit } from '../../../../services/versioning/repositoryService';
import { createBranch, deleteBranch, getRepositoryBranches } from '../../../../services/versioning/branchService';
import { createCommit } from '../../../../services/versioning/commitService';

const RepositoryCode = ({ repository, repositoryBranches, isLoggedInUserCollaborator }) => {
  const [show, setShow] = useState(false);
  const [showAddCommitModal, setShowAddCommitModal] = useState(false);
  const [branches, setBranches] = useState(repositoryBranches);
  const [newBranchName, setNewBranchName] = useState('');
  const [newCommitSubject, setNewCommitSubject] = useState('');
  const [newCommitDescription, setNewCommitDescription] = useState('');
  const [newCommitFiles, setNewCommitFiles] = useState();
  const [newCommitDirectories, setNewCommitDirectories] = useState('');
  const [deleteBranchId, setDeleteBranch] = useState('');
  const [activeBranch, setActiveBranch] = useState();
  const [activeFolders, setActiveFolders] = useState([]);
  const [activeFiles, setActiveFiles] = useState([]);
  const [activeFilesPath, setActiveFilesPath] = useState([]);

  const setCurrentBrach = async (branch) => {
    setActiveBranch(branch);
    var x = await getBranchCommit(branch.pk);
    console.log(x);
    // setActiveFolders(x);
    // setActiveFolders(await getBranchFolders(branch.pk));
    // setActiveFiles(await getBranchFiles(branch.pk));
  };

  const notify = () => toast.success('Successfully created new branch!');
  const notifyDeletedBranch = () => toast.success('Successfully deleted branch!');
  const notifyError = () => toast.error('Check if you entered all fields!');

  const showAddBranch = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setNewBranchName('');
  };

  const showAddCommit = () => {
    setShowAddCommitModal(true);
  };

  const handleCloseAddCommitModal = () => {
    setShowAddCommitModal(false);
    setNewCommitSubject('');
    setNewCommitDescription('');
    setNewCommitFiles([]);
  };

  const handleBranchNameChange = (newBranchName) => {
    setNewBranchName(newBranchName);
  };

  const handleDeleteBranchChange = (deleteBranchId) => {
    setDeleteBranch(deleteBranchId);
  };

  const handleCommitSubjectChange = (newCommitSubject) => {
    setNewCommitSubject(newCommitSubject);
  };

  const handleCommitDescriptionChange = (newCommitDescription) => {
    setNewCommitDescription(newCommitDescription);
  };

  const handleCommitFilesChange = (newCommitFiles) => {
    setNewCommitFiles(newCommitFiles);
  };

  const addBranch = async () => {
    let createdBranch = await createBranch(repository.pk, newBranchName);

    if (!createdBranch) {
      notifyError();
      return;
    } else {
      notify();
      handleClose();
      setBranches(await getRepositoryBranches(repository.pk));
    }
  };

  const removeBranch = async () => {
    await deleteBranch(deleteBranchId);
    notifyDeletedBranch();
    handleClose();
    setBranches(await getRepositoryBranches(repository.pk));
  };

  const addCommit = async () => {
    let createdCommit = await createCommit(activeBranch.pk, newCommitSubject, newCommitDescription, newCommitFiles);

    if (!createdCommit) {
      notifyError();
      return;
    } else {
      notify();
      handleCloseAddCommitModal();
      //TODO: update branch
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Manage branches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Add new branch</h5>
            <Form>
              <Form.Group className="mb-3">
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
            <div align="right">
              <Button
                variant="success"
                onClick={() => {
                  addBranch();
                }}
              >
                Add Branch
              </Button>
            </div>
          </div>
          <div>
            <h5>Delete branch</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleDeleteBranchChange(e.target.value);
                  }}
                >
                  {branches?.map((branch) => {
                    return (
                      <option key={branch.pk} value={branch.pk}>
                        {branch.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
            <div align="right">
              <Button
                variant="warning"
                onClick={() => {
                  removeBranch();
                }}
              >
                Delete Branch
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddCommitModal} onHide={handleCloseAddCommitModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add commit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Commit subject</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter commit subject"
                value={newCommitSubject}
                onChange={(e) => {
                  handleCommitSubjectChange(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Commit description</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter commit description"
                value={newCommitDescription}
                onChange={(e) => {
                  handleCommitDescriptionChange(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Commit folder</Form.Label>
              <br />
              <input
                directory=""
                webkitdirectory=""
                type="file"
                onChange={(e) => {
                  handleCommitFilesChange(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              addCommit();
            }}
          >
            Add Commit
          </Button>
          <Button variant="danger" onClick={handleCloseAddCommitModal}>
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
                  {branches.map((branch) => {
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
                  Manage branches
                </Button>
                <span> </span>
                <Button variant="outline-primary" onClick={showAddCommit}>
                  {' '}
                  <MdAddCircle size={24} /> Add commit
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
