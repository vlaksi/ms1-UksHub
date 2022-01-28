import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchAllIssues } from '../../../common/services/progresstrackapp/issuesService';
import { Tab, Col, ListGroup, Row, Badge } from 'react-bootstrap';
import { searchAllUsers } from '../../../common/services/useractivity/userService';
import { searchAllRepositories } from '../../../common/services/versioning/repositoryService';

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
                                Search results:
                                <br />
                                Repositories with name: {searchedRepositories[0]?.name ?? searchedRepositories[0]?.name}
                                <br />
                                Repositories with name:{searchedRepositories[1]?.name ?? searchedRepositories[1]?.name}
                                <Row sm={8}>
                                    <Col sm={6}>

                                    </Col>

                                    <Col sm={6}>

                                    </Col>
                                </Row>
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
                                Search results:
                                <br />
                                Issue with title: {searchedIssues[0]?.title ?? searchedIssues[0]?.title}
                                <br />
                                Issue with title:{searchedIssues[1]?.title ?? searchedIssues[1]?.title}
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link5">
                                <h3>Users</h3>
                                Search results:
                                <br />
                                User with Username: {searchedUsers[0]?.username ?? searchedUsers[0]?.username}
                                <br />
                                User with Username:{searchedUsers[1]?.username ?? searchedUsers[1]?.username}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default Search;
