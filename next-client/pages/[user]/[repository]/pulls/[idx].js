import { useRouter } from 'next/router';

const PullRequestIndex = () => {
	const router = useRouter();
	const { idx } = router.query;

	return (
		<>
			<h5> Add style for the PullRequest </h5>
			<p> PullRequestIndex: {idx}</p>
		</>
	);
};

export default PullRequestIndex;
