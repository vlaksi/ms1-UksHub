import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";

const RepositoryListItem = ({ username, name, repositoryId }) => {
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            <Link href={`/${username}/${repositoryId}`}>
              <a style={{ textDecoration: "none", color: "#444" }}>
                <h5> {name} </h5>
              </a>
            </Link>
          </Col>
          {/* TMP: Add something if we want */}
          <Col md="auto"> ~ </Col>
          <Col xs lg="2">
            /
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RepositoryListItem;
