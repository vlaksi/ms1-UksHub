import { getIssueById } from '../../../services/progresstrackapp/issuesService';
import { useState, useEffect } from 'react';
import { Badge, Card } from 'react-bootstrap';
import UserSearch from '../../atoms/UserSearch/UserSearch';

const IssueDetails = ({ issueId }) => {
  const [issue, setIssue] = useState('');

  useEffect(async () => {
    if (!issueId) return;
    let issue = await getIssueById(issueId);
    setIssue(issue);
  }, [issueId]);
  return (
    <>
      {issue && (
        <>
          <h3>
            <div style={{ display: 'flex' }}>
              <Badge
                pill
                bg="primary"
                text="light"
                style={{ marginRight: '10px' }}
              >
                #{issue.pk}
              </Badge>{' '}
              {issue.title}
            </div>
          </h3>
          <div>
            <Card border="light" style={{ width: '25%', marginLeft: '75%' }}>
              <Card.Header>Assignees</Card.Header>
              <Card.Body>
                <UserSearch placeholder="Add an assignee..."></UserSearch>
              </Card.Body>
            </Card>
            <Card
              border="light"
              style={{ width: '25%', marginLeft: '75%', marginTop: '25px' }}
            >
              <Card.Header>Labels</Card.Header>
              <Card.Body>
                <UserSearch placeholder="Add a label..."></UserSearch>
              </Card.Body>
            </Card>
            <Card
              border="light"
              style={{ width: '25%', marginLeft: '75%', marginTop: '25px' }}
            >
              <Card.Header>Milestones</Card.Header>
              <Card.Body>
                <UserSearch placeholder="Add a milestone..."></UserSearch>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};
export default IssueDetails;
