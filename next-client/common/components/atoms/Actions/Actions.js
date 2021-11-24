import { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineStar, AiOutlineBranches } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import Link from 'next/link';
import {
	createRepositoryAction,
	deleteActionById,
	getActionByRepoAndAuthor,
} from '../../../services/useractivity/actionService';

const Actions = ({ username, repository }) => {
	const notify = (message = 'Successfully!') => toast.success(` ${message} `);
	const notifyError = () => toast.error('Smth went wrong!');

	const [isUserWatchRepo, setIsUserWatchRepo] = useState(false);
	const [isUserStarRepo, setIsUserStarRepo] = useState(false);
	const [isUserForkRepo, setIsUserForkRepo] = useState(false);

	const [watchAction, setWatchAction] = useState();
	const [starAction, setStarAction] = useState();
	const [forkAction, setForkAction] = useState();

	useEffect(async () => {
		if (!repository) return;
		// Watch
		let watchAction = await getActionByRepoAndAuthor('watch', repository.pk, 1); // TODO: Put real one userId
		if (watchAction?.pk) {
			setIsUserWatchRepo(true);
			setWatchAction(watchAction);
		}

		// Star
		let starAction = await getActionByRepoAndAuthor('star', repository.pk, 1); // TODO: Put real one userId
		if (starAction?.pk) {
			setIsUserStarRepo(true);
			setStarAction(starAction);
		}

		// Fork
		let forkAction = await getActionByRepoAndAuthor('fork', repository.pk, 1); // TODO: Put real one userId
		if (forkAction?.pk) {
			setIsUserForkRepo(true);
			setForkAction(forkAction);
		}
	}, []);

	const watchRepository = async () => {
		setIsUserWatchRepo(true);
		setWatchAction(await createRepositoryAction(1, repository.pk, 'watch'));
		// TODO: Add real logged user id as the first param
		notify('Successfully watched repository!');
	};

	const unWatchRepository = () => {
		setIsUserWatchRepo(false);
		deleteActionById(watchAction.pk);
		notify('Successfully deleted repository!');
	};

	const starRepository = async () => {
		setIsUserStarRepo(true);
		setStarAction(await createRepositoryAction(1, repository.pk, 'star'));
		// TODO: Add real logged user id as the first param
		notify('Successfully stared repository!');
	};

	const unStarRepository = () => {
		setIsUserStarRepo(false);
		deleteActionById(starAction.pk);
		notify('Successfully deleted repository!');
	};

	const forkRepository = async () => {
		setIsUserForkRepo(true);
		setForkAction(await createRepositoryAction(1, repository.pk, 'fork'));
		// TODO: Add real logged user id as the first param
		notify('Successfully forked repository!');
		// TODO: Create that repository to this user !!
	};

	const unForkRepository = () => {
		setIsUserForkRepo(false);
		deleteActionById(forkAction.pk);
		notify('Successfully deleted repository!');
		// TODO: Delete that repository also !!!
	};

	return (
		<>
			<ToastContainer position="top-right" autoClose={3000}></ToastContainer>
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
									unWatchRepository();
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
									unStarRepository();
								}}
							>
								<AiOutlineStar size={22} /> Unstar
							</Button>
						) : (
							<Button
								variant="outline-secondary"
								onClick={() => {
									starRepository();
								}}
							>
								<AiOutlineStar size={22} /> Star
							</Button>
						)}
						<Link href={`/${username}/${repository.pk}/stargazers`}>
							<Button variant="outline-secondary">
								<FiMoreHorizontal />
							</Button>
						</Link>
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
									unForkRepository();
								}}
							>
								<AiOutlineBranches size={22} /> Unfork
							</Button>
						) : (
							<Button
								variant="outline-secondary"
								onClick={() => {
									forkRepository();
								}}
							>
								<AiOutlineBranches size={22} /> Fork
							</Button>
						)}

						<Link href={`/${username}/${repository.pk}/forks`}>
							<Button variant="outline-secondary">
								<FiMoreHorizontal />
							</Button>
						</Link>
					</ButtonGroup>
				</div>
			</div>
		</>
	);
};

export default Actions;
