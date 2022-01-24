import React from 'react';
import { Tab, Col, ListGroup, Row } from "react-bootstrap";
import { Chart, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2';
import styles from './RepositoryInsights.module.scss';
import { MdAssignment, MdCheckCircleOutline, MdExitToApp, FiGitPullRequest } from "react-icons/md";
import { AiOutlinePullRequest } from 'react-icons/ai';

const RepositoryInsights = ({ repositoryIssues, repositoryPRs }) => {
	Chart.register(ArcElement);

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
								2
							</ListGroup.Item>
							<ListGroup.Item action href="#link3">
								3
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
