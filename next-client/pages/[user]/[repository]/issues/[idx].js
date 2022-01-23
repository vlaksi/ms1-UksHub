import { useRouter } from "next/router";
import IssueDetails from "../../../../common/components/organisms/Issues/IssueDetails";

const IssueIndex = () => {
  const router = useRouter();
  const { idx } = router.query;

  return (
    <>
      <IssueDetails issueId={idx}></IssueDetails>
    </>
  );
};

export default IssueIndex;
