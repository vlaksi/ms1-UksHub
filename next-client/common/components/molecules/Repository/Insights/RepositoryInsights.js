import React from 'react';
import { Tab, Col, ListGroup, Row } from "react-bootstrap";
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Pie, Line } from 'react-chartjs-2';
import styles from './RepositoryInsights.module.scss';
import { MdAssignment, MdCheckCircleOutline, MdExitToApp } from "react-icons/md";
import { AiOutlinePullRequest } from 'react-icons/ai';

const RepositoryInsights = ({ repositoryIssues, repositoryPRs, commitsToMainBranch }) => {
	Chart.register(ArcElement);
	Chart.register(CategoryScale);
	Chart.register(LinearScale);
	Chart.register(PointElement);
	Chart.register(LineElement);
	console.log(commitsToMainBranch)

	const getOpenedIssues = () => {
		var numberOfOpenedIssues = 0;
		repositoryIssues.map((item) => {
			if (item.is_opened) {
				numberOfOpenedIssues = numberOfOpenedIssues + 1;
			}
		})
		return numberOfOpenedIssues;
	}
	const getOpenedPRs = () => {
		var numberOfOpenedMRs = 0;
		repositoryPRs.map((item) => {
			if (!item.is_merged) {
				numberOfOpenedMRs = numberOfOpenedMRs + 1;
			}
		})
		return numberOfOpenedMRs;
	}
	const dataForIssuesChart = {
		datasets: [{
			data: [getOpenedIssues(), repositoryIssues?.length - getOpenedIssues()],
			backgroundColor: [
				'#FF6384',
				'#36A2EB',
			],

		}]
	};
	const dataForPRsChart = {
		datasets: [{
			data: [getOpenedPRs(), repositoryPRs?.length - getOpenedPRs()],
			backgroundColor: [
				'#238636',
				'#8957e5',
			],
		}]
	};

	const data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				fill: false,
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
				data: [65, 59, 80, 81, 56, 55, 40]
			}
		]
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
								Commits
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
											<Pie
												data={dataForPRsChart}
											/>
										</div>
										<div><AiOutlinePullRequest /> {repositoryPRs?.length} created pull request</div>
										<div><AiOutlinePullRequest color='#238636' /> {getOpenedPRs()} opened PRs</div>
										<div><AiOutlinePullRequest color='#8957e5' /> {repositoryPRs?.length - getOpenedPRs()} Merged PRs</div>
									</Col>

									<Col sm={6}>
										<div className={styles.overviewChart}>
											<Pie
												data={dataForIssuesChart}
											/>
										</div>
										<div><MdAssignment /> {repositoryIssues?.length}  created Issues</div>
										<div><MdCheckCircleOutline color='#36A2EB' /> {getOpenedIssues()} opened Issues</div>
										<div><MdExitToApp color='#FF6384' /> {repositoryIssues?.length - getOpenedIssues()} closed Issues</div>

									</Col>
								</Row>

							</Tab.Pane>
							<Tab.Pane eventKey="#link2">
								<h3>Commits</h3>
								<div className={styles.lineChart}>
									<Line
										data={data}
									/>
								</div>
							</Tab.Pane>
							<Tab.Pane eventKey="#link3">

							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default RepositoryInsights;
