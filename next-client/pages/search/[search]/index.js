import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchAllIssues } from '../../../common/services/progresstrackapp/issuesService';
import { Tab, Col, ListGroup, Row, Badge } from 'react-bootstrap';
import { searchAllUsers } from '../../../common/services/useractivity/userService';
import { searchAllRepositories } from '../../../common/services/versioning/repositoryService';
import SearchIssueListItem from '../../../common/components/atoms/SearchIssueListItem/SearchIssueListItem';
import RepositoryListItem from '../../../common/components/atoms/RepositoryListItem/RepositoryListItem';

const Search = () => {
    const router = useRouter();
    const { search } = router.query;

    const [searchedIssues, setSearchedIssues] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [searchedRepositories, setSearchedRepositories] = useState([]);

    useEffect(async () => {
        let issues = await searchAllIssues(search);
        let users = await searchAllUsers(search);
        let repositories = await searchAllRepositories(search);
        setSearchedIssues(issues)
        setSearchedUsers(users)
        setSearchedRepositories(repositories)
    }, [search]);

    return (
        <>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            <ListGroup.Item action href="#link1">
                                Repositories    <Badge bg="info" text="dark">{searchedRepositories?.length}</Badge>
                            </ListGroup.Item>
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
                            <Tab.Pane eventKey="#link1">
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
                            </Tab.Pane>
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
                                <table class="table">
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
                                        {searchedUsers?.map((user, index) => {
                                            return (
                                                <tr key={user.pk}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.email}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default Search;
