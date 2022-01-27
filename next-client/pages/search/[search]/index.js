import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchAllIssues } from '../../../common/services/progresstrackapp/issuesService';
import { Tab, Col, ListGroup, Row } from 'react-bootstrap';

const Search = () => {
    const router = useRouter();
    const { search } = router.query;
    const [searchedIssues, setSearchedIssues] = useState([]);
    console.log(search, "search")

    useEffect(async () => {
        let issues = await searchAllIssues(search);
        console.log(search, issues)
        setSearchedIssues(issues)
    }, [search]);

    return (
        <>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            <ListGroup.Item action href="#link1">
                                Repositories
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2">
                                Code
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link3">
                                Commits
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link4">
                                Issues  {searchedIssues.length}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                                <h3>Repositories</h3>
                                <Row sm={8}>
                                    <Col sm={6}>

                                    </Col>

                                    <Col sm={6}>

                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                                <h3>Code</h3>

                            </Tab.Pane>
                            <Tab.Pane eventKey="#link3">
                                <h3>Commits</h3>

                            </Tab.Pane>
                            <Tab.Pane eventKey="#link4">
                                <h3>Issues</h3>
                                Search results:
                                <br />
                                Issue with title: {searchedIssues[0]?.title}
                                <br />
                                Issue with title:{searchedIssues[1]?.title}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default Search;
