import { useRouter } from "next/router";
import PullRequestDetails from "../../../../common/components/organisms/PullRequests/PullRequestDetails";

const PullRequestIndex = () => {
  const router = useRouter();
  const { idx } = router.query;

  return (
    <>
      <h5> Add style for the PullRequest </h5>
      <PullRequestDetails pullRequestId={idx}></PullRequestDetails>
    </>
  );
};

export default PullRequestIndex;
