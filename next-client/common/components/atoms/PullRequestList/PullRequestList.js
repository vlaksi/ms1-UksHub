import PullRequestItem from '../PullRequestItem/PullRequestItem';

const PullRequestList = ({ pullRequests }) => {
	return (
		<>
			{pullRequests && pullRequests.map((pullRequest) => {
				return (
					<div key={pullRequest.pk}>
						<PullRequestItem pullRequest={pullRequest} />
					</div>
				);
			})}
		</>
	);
};

export default PullRequestList;
