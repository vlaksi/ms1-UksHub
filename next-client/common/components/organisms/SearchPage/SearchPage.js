import { Tab, Col, ListGroup, Row, Badge } from 'react-bootstrap';
import RepositoryListItem from '../../atoms/RepositoryListItem/RepositoryListItem';
import SearchIssueListItem from '../../atoms/SearchIssueListItem/SearchIssueListItem';
import SearchListOfUsers from '../../atoms/SearchListOfUsers/SearchListOfUsers';

const SearchPage = ({ isSearchInThisRepo, searchedRepositories, searchedIssues, searchedUsers }) => {
    return (
        <>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={isSearchInThisRepo ? "#link2" : "#link2"} >
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {!isSearchInThisRepo && <ListGroup.Item action href="#link1">
                                Repositories  <Badge bg="info" text="dark">{searchedRepositories?.length}</Badge>
                            </ListGroup.Item>}
                            <ListGroup.Item action href="#link2">
                                Code
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link3">
                                Commits
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link4">
                                Issues     <Badge bg="info" text="dark">{searchedIssues?.length}</Badge>
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link5">
                                Users     <Badge bg="info" text="dark">{searchedUsers?.length}</Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {!isSearchInThisRepo && <Tab.Pane eventKey="#link1">
                                <h3>Repositories</h3>
                                {searchedRepositories?.map((repository) => {
                                    return (
                                        <RepositoryListItem
                                            key={repository.pk}
                                            authorId={repository.author}
                                            repository={repository}
                                        />
                                    );
                                })}
                            </Tab.Pane>}
                            <Tab.Pane eventKey="#link2">
                                <h3>Code</h3>
                                Coming soon...
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link3">
                                <h3>Commits</h3>
                                Coming soon...
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link4">
                                <h3>Issues</h3>
                                <div style={{ marginTop: "35px" }}>
                                    {searchedIssues?.map((issueItem) => {
                                        return (
                                            <div key={issueItem.pk}>
                                                <SearchIssueListItem issue={issueItem} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link5">
                                <h3>Users</h3>
                                <SearchListOfUsers listUsers={searchedUsers} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default SearchPage;
