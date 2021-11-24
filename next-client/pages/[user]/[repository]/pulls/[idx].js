import { useRouter } from "next/router";
import PullRequestDetails from "../../../../common/components/organisms/PullRequests/PullRequestDetails";

const PullRequestIndex = () => {
  const router = useRouter();
  const { idx } = router.query;

  return (
    <>
      <PullRequestDetails pullRequestId={idx}></PullRequestDetails>
    </>
  );
};

export default PullRequestIndex;
