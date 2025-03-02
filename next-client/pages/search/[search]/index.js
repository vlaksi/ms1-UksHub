import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchAllIssues } from '../../../common/services/progresstrackapp/issuesService';
import { searchAllUsers } from '../../../common/services/useractivity/userService';
import { searchAllRepositories } from '../../../common/services/versioning/repositoryService';
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
            <SearchPage isSearchInThisRepo={false} searchedIssues={searchedIssues} searchedUsers={searchedUsers} searchedRepositories={searchedRepositories} />
        </>
    );
};

export default Search;
