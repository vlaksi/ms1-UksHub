import { useRouter } from 'next/router';

const IssueIndex = () => {
	const router = useRouter();
	const { idx } = router.query;

	return <p>IssueIndex: {idx}</p>;
};

export default IssueIndex;
