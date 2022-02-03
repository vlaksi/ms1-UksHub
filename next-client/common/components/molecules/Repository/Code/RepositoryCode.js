import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Card,
  Dropdown,
  ListGroup,
} from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';
import { MdAddCircle } from 'react-icons/md';
import { AiFillHome, AiOutlineFile } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styles from './RepositoryCode.module.scss';

import {
  getBranchCommits,
  getBranchLastCommit,
} from '../../../../services/versioning/repositoryService';
import {
  createBranch,
  deleteBranch,
  getBranchContent,
  getRepositoryBranches,
} from '../../../../services/versioning/branchService';
import BranchCommit from '../../../atoms/BranchCommits/BranchCommit';

const RepositoryCode = ({
  showCommits,
  setShowCommits,
  repository,
  repositoryBranches,
  isLoggedInUserCollaborator,
}) => {
  const [show, setShow] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [branches, setBranches] = useState(repositoryBranches);
  const [newBranchName, setNewBranchName] = useState('');
  const [deleteBranchId, setDeleteBranch] = useState('');
  const [activeBranch, setActiveBranch] = useState();
  const [activeFolders, setActiveFolders] = useState([]);
  const [activeFiles, setActiveFiles] = useState([]);
  const [activeFilesPath, setActiveFilesPath] = useState([]);
  const [commit, setCommit] = useState([]);
  const [commits, setCommits] = useState([]);
  const [contentTitle, setContentTitle] = useState();
  const [contentBody, setContentBody] = useState();

  const setCurrentBrach = async (branch) => {
    setActiveBranch(branch);
    var commit = await getBranchLastCommit(repository.pk, branch.name);
    setCommit(commit);
    var commits = await getBranchCommits(repository.pk, branch.name);
    if (Object.keys(commits).length > 0) setCommits(commits);
  };

  const notify = () => toast.success('Successfully created new branch!');
  const notifyDeletedBranch = () =>
    toast.success('Successfully deleted branch!');
  const notifyError = () => toast.error('Check if you entered all fields!');

  const showAddBranch = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setNewBranchName('');
  };

  const handleContentClose = () => {
    setShowContent(false);
  };

  const handleBranchNameChange = (newBranchName) => {
    setNewBranchName(newBranchName);
  };

  const handleDeleteBranchChange = (deleteBranchId) => {
    setDeleteBranch(deleteBranchId);
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
    setBranches(await getRepositoryBranches(repository.pk));
  };

  useEffect(async () => {
    let gettedCurrentBranch = repositoryBranches[0];
    setCurrentBrach(gettedCurrentBranch);
    let branchContent = await getBranchContent(
      repository.pk,
      gettedCurrentBranch?.name
    );
    setActiveFiles(branchContent);
    console.log('branchContent: ', branchContent);
  }, []);

  return (
    <>
      {/* Manage branches Modal */}
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
                      <option key={branch?.pk} value={branch?.pk}>
                        {branch?.name}
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
                  {branches?.map((branch) => {
                    return (
                      <Dropdown.Item
                        key={branch.name}
                        onClick={async () => {
                          setCurrentBrach(branch);
                          setActiveFiles(
                            await getBranchContent(repository.pk, branch?.name)
                          );
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

            <div>
              {/* TMP: Until we enable folder structure */}
              {/*               
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
              /> */}
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {showCommits == true ? (
            <BranchCommit commits={commits}></BranchCommit>
          ) : (
            <ListGroup>
              {activeFolders?.map((folder) => {
                return (
                  <ListGroup.Item key={folder.name} onClick={() => { }}>
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
                      setShowContent(true);
                      setContentTitle(file.name);
                      setContentBody(file.value);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <AiOutlineFile style={{ marginRight: '8px' }} />{' '}
                      {file.name}
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className={styles.repositoryFooter}>
            {commit != null && commit[0] != null && commit[0].committed_date}
            &nbsp; &nbsp; &nbsp; &nbsp;
            <span
              onClick={() => {
                setShowCommits(true);
              }}
            >
              {' '}
              {commits != null && commits.length} commits
            </span>
          </div>
        </Card.Footer>
      </Card>

      {/* Show content of the file Modal */}
      <Modal
        size="xl"
        show={showContent}
        onHide={handleContentClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title> {contentTitle} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>
            <code>{contentBody}</code>
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleContentClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepositoryCode;
