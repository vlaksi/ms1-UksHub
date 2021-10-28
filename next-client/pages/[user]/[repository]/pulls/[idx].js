import { useRouter } from 'next/router';

const PullRequestIndex = () => {
	const router = useRouter();
	const { idx } = router.query;

	return <p>PullRequestIndex: {idx}</p>;
};

export default PullRequestIndex;
