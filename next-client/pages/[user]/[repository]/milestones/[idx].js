import { useRouter } from "next/router";

import MilestoneDetails from "../../../../common/components/organisms/Milestones/MilestoneDetails";
const MilestoneIndex = () => {
  const router = useRouter();
  const { idx } = router.query;

  return <MilestoneDetails milestoneId={idx}></MilestoneDetails>;
};

export default MilestoneIndex;
