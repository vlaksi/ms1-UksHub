import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchPage from '../../../../common/components/organisms/SearchPage/SearchPage';
import { searchAllIssuesByRepoID } from '../../../../common/services/progresstrackapp/issuesService';
import { searchRepositoryCollaboratos } from '../../../../common/services/versioning/repositoryService';

const Search = () => {
    const router = useRouter();
    const { search, repository } = router.query;
    console.log(repository, 'repository')
    const [searchedIssues, setSearchedIssues] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(async () => {
        let issues = await searchAllIssuesByRepoID(repository, search);
        let users = await searchRepositoryCollaboratos(repository, search);
        setSearchedIssues(issues)
        setSearchedUsers(users)
    }, [search]);

    return (
        <>
            <SearchPage isSearchInThisRepo={false} isSearchInThisRepo={true} earchedIssues={searchedIssues} searchedUsers={searchedUsers} />
        </>
    );
};

export default Search;
