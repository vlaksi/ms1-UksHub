import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";

import RepositoryCode from "../../molecules/Repository/Code/RepositoryCode";
import IssuesOverview from "../../molecules/Repository/Issues/IssuesOverview";
import PullRequestsOverview from "../../molecules/Repository/Pulls/PullRequestsOverview";
import RepositoryInsights from "../../molecules/Repository/Insights/RepositoryInsights";
import RepositorySettings from "../../molecules/Repository/Settings/RepositorySettings";
import { getRepositoryById } from "../../../services/versioning/repositoryService";
import { getRepositoryBranches } from "../../../services/versioning/branchService";

const UserRepository = ({ username, repositoryId }) => {
  // TODO: Get a user profile information with username attribute !!
  const [repository, setRepository] = useState();
  const [repositoryBranches, setRepositoryBranches] = useState();

  useEffect(async () => {
    if (!repositoryId) return;
    setRepository(await getRepositoryById(repositoryId));
    setRepositoryBranches(await getRepositoryBranches(repositoryId));
  }, [repositoryId]);

  return (
    <>
      {repository && repositoryBranches && (
        <Row className="justify-content-md-center">
          <Col md={10}>
            <div className="mb-3">
              <h4>
                <Link href={`/${username}`}>
                  <a style={{ textDecoration: "none", color: "#444" }}>
                    {username}
                  </a>
                </Link>{" "}
                / {repository.name}
              </h4>
            </div>
            <Tabs
              defaultActiveKey="code"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="code" title="Code">
                <RepositoryCode />
              </Tab>
              <Tab eventKey="issues" title="Issues">
                <IssuesOverview />
              </Tab>
              <Tab eventKey="pullRequests" title="Pull requests">
                <PullRequestsOverview />
              </Tab>
              <Tab eventKey="insights" title="Insights">
                <RepositoryInsights />
              </Tab>
              <Tab eventKey="settings" title="Settings">
                <RepositorySettings
                  repository={repository}
                  repositoryBranches={repositoryBranches}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserRepository;
