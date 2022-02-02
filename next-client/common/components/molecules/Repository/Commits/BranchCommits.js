import { useEffect, useState } from 'react';
import { Button, Modal, Form, Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';
import { AiFillHome, AiOutlineFile } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

import { getBranchCommits } from '../../../../services/versioning/repositoryService';

const BranchCommits = ({ repository_id, branch_name }) => {
  const [activeBranch, setActiveBranch] = useState('');
  const [commits, setCommits] = useState([]);

  const setCurrentBranch = async (branch_name) => {
    setActiveBranch(branch_name);
    var commits = await getBranchCommits(repository_id, branch_name);
    setCommits(commits);
    console.log(commits);
  };

  useEffect(async () => {
    setCurrentBranch(branch_name);
  }, []);

  return (
    <>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {commits?.map((commit, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <p>{commit.message}</p>
                        <p>
                          {commit.author}, {commit.committed_date}
                        </p>

                        <Button variant="success">View commit {commit.hash}</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </>
  );
};

export default BranchCommits;
