import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchAllIssues } from '../../../common/services/progresstrackapp/issuesService';


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
            <p> all {searchedIssues[0]?.title} </p>
        </>
    );
};

export default Search;
