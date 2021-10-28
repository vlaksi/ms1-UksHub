import { useRouter } from 'next/router';

const MilestoneIndex = () => {
	const router = useRouter();
	const { idx } = router.query;

	return <p>MilestoneIndex: {idx}</p>;
};

export default MilestoneIndex;
