import React from 'react';
import { Tab, Col, ListGroup, Row } from 'react-bootstrap';
import {
	Chart,
	ArcElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import styles from './RepositoryInsights.module.scss';
import {
	MdAssignment,
	MdCheckCircleOutline,
	MdExitToApp,
} from 'react-icons/md';
import { AiOutlinePullRequest, AiOutlineUser, AiOutlineFork } from 'react-icons/ai';

const RepositoryInsights = ({
	repositoryIssues,
	repositoryPRs,
	commitsToMainBranch,
	forksOfRepo,
	repository,
	visitsOfRepo
}) => {
	console.log('visitsOfRepo', visitsOfRepo)
	Chart.register(ArcElement);
	Chart.register(CategoryScale);
	Chart.register(LinearScale);
	Chart.register(PointElement);
	Chart.register(LineElement);
	Chart.register(Filler);
	// TODO: NEMANJA FIX THIS !, this is only tmp solution
	// if (
	// 	!!repositoryIssues === false ||
	// 	!!repositoryPRs === false ||
	// 	!!commitsToMainBranch === false
	// ) {
	// 	return (
	// 		<p>
	// 			There is no any repository issue, repository pull request or commits
	// 		</p>
	// 	);
	// }

	const getCommitsDates = () => {
		var commitsDates = [];
		commitsToMainBranch?.map((item) => {
			commitsDates.push(item.committed_date?.substring(0, 10));
		});
		return commitsDates;
	};
	const counts = {};
	getCommitsDates().forEach(function (x) {
		counts[x] = (counts[x] || 0) + 1;
	});


	const getCommitsUsers = () => {
		var commitsUsers = [];
		commitsToMainBranch?.map((item) => {
			commitsUsers.push(item.author);
		});
		return commitsUsers;
	};
	const countsUsersCommits = {};
	getCommitsUsers().forEach(function (x) {
		countsUsersCommits[x] = (countsUsersCommits[x] || 0) + 1;
	});
	console.log('countsUsersCommits', countsUsersCommits)
	console.log(counts, 'counts')
	const getVisitDates = () => {
		var visitDates = [];
		visitsOfRepo?.map((item) => {
			visitDates.push(item.visit_date.substring(0, 10));
		});
		return visitDates;
	};
	const countsVisitDates = {};
	getVisitDates().forEach(function (x) {
		countsVisitDates[x] = (countsVisitDates[x] || 0) + 1;
	});

	//Count unique visitors
	var tempResult = {}
	for (let { unique_fingerprint } of visitsOfRepo)
		tempResult[unique_fingerprint] = {
			unique_fingerprint,
			count: tempResult[unique_fingerprint] ? tempResult[unique_fingerprint].count + 1 : 1
		}
	let uniqueVisitors = Object.values(tempResult)
	//End count unique visitors


	const getOpenedIssues = () => {
		var numberOfOpenedIssues = 0;
		repositoryIssues?.map((item) => {
			if (item.is_opened) {
				numberOfOpenedIssues = numberOfOpenedIssues + 1;
			}
		});
		return numberOfOpenedIssues;
	};
	const getOpenedPRs = () => {
		var numberOfOpenedMRs = 0;
		repositoryPRs?.map((item) => {
			if (!item.is_merged) {
				numberOfOpenedMRs = numberOfOpenedMRs + 1;
			}
		});
		return numberOfOpenedMRs;
	};
	const dataForIssuesChart = {
		datasets: [
			{
				data: [getOpenedIssues(), repositoryIssues?.length - getOpenedIssues()],
				backgroundColor: ['#FF6384', '#36A2EB'],
			},
		],
	};
	const dataForPRsChart = {
		datasets: [
			{
				data: [getOpenedPRs(), repositoryPRs?.length - getOpenedPRs()],
				backgroundColor: ['#238636', '#8957e5'],
			},
		],
	};

	const data = {
		labels: Object.keys(counts),
		datasets: [
			{
				label: 'My First dataset',
				fill: true,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: Object.values(counts),
			},
		],
	};
	const trafficData = {
		labels: Object.keys(countsVisitDates),
		datasets: [
			{
				label: 'My First dataset',
				fill: true,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: Object.values(countsVisitDates),
			},
		],
	};
	return (
		<>
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
				<Row>
					<Col sm={4}>
						<ListGroup>
							<ListGroup.Item action href="#link1">
								Pulse
							</ListGroup.Item>
							<ListGroup.Item action href="#link2">
								Contributors
							</ListGroup.Item>
							<ListGroup.Item action href="#link3">
								Forks
							</ListGroup.Item>
							<ListGroup.Item action href="#link4">
								Traffic
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
							<Tab.Pane eventKey="#link1">
								<h3>Overview</h3>
								<Row sm={8}>
									<Col sm={6}>
										<div className={styles.overviewChart}>
											<Pie data={dataForPRsChart} />
										</div>
										<div>
											<AiOutlinePullRequest /> {repositoryPRs?.length} created
											pull request
										</div>
										<div>
											<AiOutlinePullRequest color="#238636" /> {getOpenedPRs()}{' '}
											opened PRs
										</div>
										<div>
											<AiOutlinePullRequest color="#8957e5" />{' '}
											{repositoryPRs?.length - getOpenedPRs()} Merged PRs
										</div>
									</Col>

									<Col sm={6}>
										<div className={styles.overviewChart}>
											<Pie data={dataForIssuesChart} />
										</div>
										<div>
											<MdAssignment /> {repositoryIssues?.length} created Issues
										</div>
										<div>
											<MdCheckCircleOutline color="#36A2EB" />{' '}
											{getOpenedIssues()} opened Issues
										</div>
										<div>
											<MdExitToApp color="#FF6384" />{' '}
											{repositoryIssues?.length - getOpenedIssues()} closed
											Issues
										</div>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="#link2">
								<h3>Commits</h3>
								Contributions to main, excluding merge commits and bot accounts
								<div className={styles.lineChart}>
									<Line data={data} />
									<h3>Commits per users:</h3>
									{Object.keys(countsUsersCommits)?.map((key, value) => {
										return <div><h5><AiOutlineUser /> {key}: {countsUsersCommits[key]}</h5></div>
									})}

								</div>
							</Tab.Pane>
							<Tab.Pane eventKey="#link3">
								<h3>Forks</h3>
								<br />
								{forksOfRepo.length == 0 &&
									<div>
										<AiOutlineFork />
										No one has forked this repository yet.
									</div>
								}
								{forksOfRepo?.map((item) => {
									return <h5><AiOutlineUser /> {item.username} / {repository.name} <br /></h5>
								})}
							</Tab.Pane>
							<Tab.Pane eventKey="#link4">
								<h3>Traffic</h3>
								<br />
								<div className={styles.lineChart}>
									Visits
									<Line data={trafficData} />
									<h4>Unique visitors: {uniqueVisitors?.length}</h4>
								</div>
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default RepositoryInsights;
