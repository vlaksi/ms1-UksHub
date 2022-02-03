import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchPage from '../../../../common/components/organisms/SearchPage/SearchPage';
import { searchAllIssuesByRepoID } from '../../../../common/services/progresstrackapp/issuesService';
import { getMainBranchCommits } from '../../../../common/services/versioning/branchService';
import { searchRepositoryCollaboratos } from '../../../../common/services/versioning/repositoryService';

const Search = () => {
    const router = useRouter();
    const { search, repository } = router.query;

    const [searchedIssues, setSearchedIssues] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [commitsToMainBranch, setCommitsToMainBranch] = useState([]);
    console.log('ssss', commitsToMainBranch)
    useEffect(async () => {
        let issues = await searchAllIssuesByRepoID(repository, search);
        let users = await searchRepositoryCollaboratos(repository, search);
        setCommitsToMainBranch(await getMainBranchCommits(repository));
        setSearchedIssues(issues)
        setSearchedUsers(users)
    }, [search]);

    return (
        <>
            <SearchPage isSearchInThisRepo={false} isSearchInThisRepo={true} searchedIssues={searchedIssues} searchedUsers={searchedUsers} commitsToMainBranch={commitsToMainBranch} />
        </>
    );
};

export default Search;
