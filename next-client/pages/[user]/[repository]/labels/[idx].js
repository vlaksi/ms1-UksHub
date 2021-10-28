import { useRouter } from 'next/router';

const LabelIndex = () => {
	const router = useRouter();
	const { idx } = router.query;

	return <p>LabelIndex: {idx}</p>;
};

export default LabelIndex;
