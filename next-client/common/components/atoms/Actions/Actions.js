import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineStar, AiOutlineBranches } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';

import Link from 'next/link';
import { createRepositoryAction } from '../../../services/useractivity/actionService';

const Actions = ({ username, repository }) => {
	const [isUserWatchRepo, setIsUserWatchRepo] = useState(false);
	const [isUserStarRepo, setIsUserStarRepo] = useState(false);
	const [isUserForkRepo, setIsUserForkRepo] = useState(false);

	const watchRepository = () => {
		setIsUserWatchRepo(true);
		createRepositoryAction(1, repository.pk, 'watch');
		// TODO: Add real logged user id as the first param
	};

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			{/* Watch */}
			<div style={{ marginRight: '5px' }}>
				<ButtonGroup aria-label="Basic example">
					{isUserWatchRepo ? (
						<Button
							style={{ backgroundColor: '#c3c3c3' }}
							variant="outline-secondary"
							onClick={() => {
								setIsUserWatchRepo(false);
							}}
						>
							<AiOutlineEye size={22} /> Unwatch
						</Button>
					) : (
						<Button
							variant="outline-secondary"
							onClick={() => {
								watchRepository();
							}}
						>
							<AiOutlineEye size={22} /> Watch
						</Button>
					)}
					<Link href={`/${username}/${repository.pk}/watchers`}>
						<Button variant="outline-secondary">
							<FiMoreHorizontal />
						</Button>
					</Link>
				</ButtonGroup>
			</div>
			{/* Star */}
			<div style={{ marginRight: '5px', marginLeft: '5px' }}>
				<ButtonGroup aria-label="Basic example">
					{isUserStarRepo ? (
						<Button
							variant="outline-secondary"
							style={{ backgroundColor: '#c3c3c3' }}
							onClick={() => {
								setIsUserStarRepo(false);
							}}
						>
							<AiOutlineStar size={22} /> Unstar
						</Button>
					) : (
						<Button
							variant="outline-secondary"
							onClick={() => {
								setIsUserStarRepo(true);
							}}
						>
							<AiOutlineStar size={22} /> Star
						</Button>
					)}
					<Button variant="outline-secondary">
						<FiMoreHorizontal />
					</Button>
				</ButtonGroup>
			</div>
			{/* Fork */}
			<div style={{ marginLeft: '5px' }}>
				<ButtonGroup aria-label="Basic example">
					{isUserForkRepo ? (
						<Button
							variant="outline-secondary"
							style={{ backgroundColor: '#c3c3c3' }}
							onClick={() => {
								setIsUserForkRepo(false);
							}}
						>
							<AiOutlineBranches size={22} /> Unfork
						</Button>
					) : (
						<Button
							variant="outline-secondary"
							onClick={() => {
								setIsUserForkRepo(true);
							}}
						>
							<AiOutlineBranches size={22} /> Fork
						</Button>
					)}

					<Button variant="outline-secondary">
						<FiMoreHorizontal />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};

export default Actions;
