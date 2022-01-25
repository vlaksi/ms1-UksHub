import {
	getAllIssueAssignees,
	getAllIssueLabels,
	getIssueById,
	updateIssueAssigness,
	updateIssueLabels,
} from '../../../services/progresstrackapp/issuesService';
import { useState, useEffect } from 'react';
import { Badge, Card, ListGroup, Modal, Button } from 'react-bootstrap';
import UserSearch from '../../atoms/UserSearch/UserSearch';
import { getUserDataForIssueAssigneesSearch } from '../../../services/useractivity/userService';
import { useRouter } from 'next/router';
import { AiFillDelete } from 'react-icons/ai';
import { getLabelDataForIssueLabellingSearch } from '../../../services/progresstrackapp/labelsService';
import RepositoryNav from '../../atoms/RepositoryNav/RepositoryNav';

const IssueDetails = ({ issueId }) => {
	const [issue, setIssue] = useState('');

	const [userDataForSearch, setUserDataForSearch] = useState([]);
	const [labelDataForSearch, setLabelDataForSearch] = useState([]);

	const [issueAssignees, setIssueAssignees] = useState([]);
	const [removeCandidate, setRemoveCandidate] = useState('');
	const [issueAddedLabels, setIssueAddedLabels] = useState([]);
	const [removeLabel, setRemoveLabel] = useState('');

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const handleDeleteModalClose = () => setShowDeleteModal(false);
	const handleShowDeleteModal = () => setShowDeleteModal(true);

	const router = useRouter();
	const { repository } = router.query;

	useEffect(async () => {
		if (!repository) return;
		setIssueAssignees(await getAllIssueAssignees(issueId));

		setUserDataForSearch(await getUserDataForIssueAssigneesSearch(repository));
	}, [repository]);

	const isUserAlreadyAssignee = (user) => {
		return issueAssignees.find((assignee) => assignee.username == user.title);
	};

	useEffect(async () => {
		if (!repository) return;
		setIssueAddedLabels(await getAllIssueLabels(issueId));

		setLabelDataForSearch(
			await getLabelDataForIssueLabellingSearch(repository)
		);
	}, [repository]);

	const isLabelAlreadyAdded = (label) => {
		return issueAddedLabels.find(
			(addedLabel) => addedLabel.name == label.title
		);
	};

	useEffect(async () => {
		if (!issueId) return;
		let issue = await getIssueById(issueId);
		setIssue(issue);
	}, [issueId]);
	return (
		<>
			{issue && (
				<>
					<RepositoryNav />
					<h3>
						<div style={{ display: 'flex' }}>
							<Badge
								pill
								bg="primary"
								text="light"
								style={{ marginRight: '10px' }}
							>
								#{issue.pk}
							</Badge>{' '}
							{issue.title}
						</div>
					</h3>
					<div>
						<Card style={{ width: '25%', marginLeft: '75%' }}>
							<Card.Header>Assignees</Card.Header>
							<Card.Body>
								<UserSearch
									placeholder="Add an assignee..."
									data={userDataForSearch.filter(
										(user) => !isUserAlreadyAssignee(user)
									)}
									onSelectItem={async (selectedValue) => {
										await updateIssueAssigness(issueId, [selectedValue.pk]);
										setIssueAssignees(await getAllIssueAssignees(issueId));
									}}
								></UserSearch>
							</Card.Body>
							<ListGroup variant="flush">
								{issueAssignees?.map((issueAssignee) => {
									return (
										<ListGroup.Item
											key={issueAssignee.id}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<div style={{ display: 'flex' }}>
												<p> {issueAssignee.username} </p>
											</div>
											<div>
												{issueAssignees.length > 0 && (
													<AiFillDelete
														style={{ cursor: 'pointer', marginBottom: '15px' }}
														onClick={() => {
															setRemoveCandidate(issueAssignee);
															handleShowDeleteModal();
														}}
													/>
												)}
											</div>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						</Card>
						<Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
							<Modal.Header closeButton>
								<Modal.Title>Remove confirmation</Modal.Title>
							</Modal.Header>
							<Modal.Body
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: ' baseline',
								}}
							>
								<p>
									Are you sure you want to remove chosen user from assignees?
								</p>
							</Modal.Body>

							<Modal.Footer>
								<Button
									variant="success"
									onClick={() => {
										setIssueAssignees(
											issueAssignees.filter(
												(issueAssignee) =>
													issueAssignee.username != removeCandidate.username
											)
										);
										handleDeleteModalClose();
										//deleteCollaborationById(removeCandidate.collaboration_id);
									}}
								>
									Remove
								</Button>
								<Button variant="danger" onClick={handleDeleteModalClose}>
									Cancel
								</Button>
							</Modal.Footer>
						</Modal>
						<Card
							style={{ width: '25%', marginLeft: '75%', marginTop: '25px' }}
						>
							<Card.Header>Labels</Card.Header>
							<Card.Body>
								<UserSearch
									placeholder="Add a label..."
									data={labelDataForSearch.filter(
										(label) => !isLabelAlreadyAdded(label)
									)}
									onSelectItem={async (selectedValue) => {
										await updateIssueLabels(issueId, [selectedValue.pk]);
										setIssueAddedLabels(await getAllIssueLabels(issueId));
									}}
								></UserSearch>
							</Card.Body>
							<ListGroup variant="flush">
								{issueAddedLabels?.map((issueAddedLabel) => {
									return (
										<ListGroup.Item
											key={issueAddedLabel.pk}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<div style={{ display: 'flex' }}>
												<p>
													{' '}
													<div
														className="fw-bold"
														style={{
															background: issueAddedLabel.color,
															borderRadius: '15px',
															padding: '4px',
															color: 'white',
															display: 'flex',
														}}
													>
														{issueAddedLabel.name}
													</div>
												</p>
											</div>
											<div>
												{issueAddedLabels.length > 0 && (
													<AiFillDelete
														style={{ cursor: 'pointer', marginBottom: '15px' }}
														onClick={() => {
															setRemoveLabel(issueAddedLabel);
															handleShowDeleteModal();
														}}
													/>
												)}
											</div>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						</Card>
						<Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
							<Modal.Header closeButton>
								<Modal.Title>Remove confirmation</Modal.Title>
							</Modal.Header>
							<Modal.Body
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: ' baseline',
								}}
							>
								<p>Are you sure you want to remove chosen label from issue?</p>
							</Modal.Body>

							<Modal.Footer>
								<Button
									variant="success"
									onClick={() => {
										setIssueAddedLabels(
											issueAddedLabels.filter(
												(issueAddedLabel) =>
													issueAddedLabel.name != removeLabel.name
											)
										);
										handleDeleteModalClose();
										//deleteCollaborationById(removeCandidate.collaboration_id);
									}}
								>
									Remove
								</Button>
								<Button variant="danger" onClick={handleDeleteModalClose}>
									Cancel
								</Button>
							</Modal.Footer>
						</Modal>
						<Card
							border="light"
							style={{ width: '25%', marginLeft: '75%', marginTop: '25px' }}
						>
							<Card.Header>Milestones</Card.Header>
							<Card.Body>
								<UserSearch placeholder="Add a milestone..."></UserSearch>
							</Card.Body>
						</Card>
					</div>
				</>
			)}
		</>
	);
};
export default IssueDetails;
