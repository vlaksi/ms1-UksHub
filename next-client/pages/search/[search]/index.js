import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchAllIssues } from '../../../common/services/progresstrackapp/issuesService';
import { searchAllUsers } from '../../../common/services/useractivity/userService';
import { searchAllRepositories } from '../../../common/services/versioning/repositoryService';
import { Tab, Col, ListGroup, Row, Badge } from 'react-bootstrap';
import RepositoryListItem from '../../../common/components/atoms/RepositoryListItem/RepositoryListItem';
import SearchListOfUsers from '../../../common/components/atoms/SearchListOfUsers/SearchListOfUsers';
import SearchIssueListItem from '../../../common/components/atoms/SearchIssueListItem/SearchIssueListItem';
import SearchPage from '../../../common/components/organisms/SearchPage/SearchPage';

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
            <SearchPage searchedIssues={searchedIssues} searchedUsers={searchedUsers} searchedRepositories={searchedRepositories} />
        </>
    );
};

export default Search;
