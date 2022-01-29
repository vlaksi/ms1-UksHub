import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchPage from '../../../../common/components/organisms/SearchPage/SearchPage';
import { searchAllIssuesByRepoID } from '../../../../common/services/progresstrackapp/issuesService';
import { getRepositoryCollaboratos, searchAllRepositories, searchRepositoryCollaboratos } from '../../../../common/services/versioning/repositoryService';

const Search = () => {
    const router = useRouter();
    const { search, repository } = router.query;
    console.log(repository, 'repository')
    const [searchedIssues, setSearchedIssues] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [searchedRepositories, setSearchedRepositories] = useState([]);

    useEffect(async () => {
        let issues = await searchAllIssuesByRepoID(repository, search);
        let users = await searchRepositoryCollaboratos(repository, search);
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
