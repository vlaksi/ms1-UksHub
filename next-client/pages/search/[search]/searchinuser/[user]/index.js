import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchPage from '../../../../../common/components/organisms/SearchPage/SearchPage';
import { searchAllIssuesByRepoID, searchAllIssuesOfAuthor } from '../../../../../common/services/progresstrackapp/issuesService';
import { searchAllRepositoriesByAuthor } from '../../../../../common/services/versioning/repositoryService';

const Search = () => {
    const router = useRouter();
    const { search, repository, user } = router.query;
    const [searchedIssues, setSearchedIssues] = useState([]);
    const [searchedRepositories, setSearchedRepositories] = useState([]);
    console.log(searchedRepositories)
    useEffect(async () => {
        let issues = await searchAllIssuesOfAuthor(user, search);
        let repositories = await searchAllRepositoriesByAuthor(user, search);
        setSearchedIssues(issues)
        setSearchedRepositories(repositories)
    }, [search]);
    console.log('searchedIssues', searchedIssues)
    return (
        <>
            <SearchPage isSearchInThisUser={true} isSearchInThisRepo={false} searchedIssues={searchedIssues} searchedRepositories={searchedRepositories} />
        </>
    );
};

export default Search;
