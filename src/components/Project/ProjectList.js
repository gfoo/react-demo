import { useContext, useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import ProjectMiniView from "./ProjectMiniView";
import ProjectView from "./ProjectView";

const ProjectList = ({ projects = [], onDelete = () => {} }) => {
  const { userProfile } = useContext(AuthContext);

  const [projectsFilter, setProjectsFilter] = useState("All");

  const filterProject = (p) => {
    return (
      projectsFilter === "All" ||
      (projectsFilter === "Public" && p.private === false) ||
      (projectsFilter === "Private" && p.private === true) ||
      (projectsFilter === "Mine" && p.owner.id === userProfile.id)
    );
  };

  return (
    <>
      <Row xs="auto">
        <Col>
          <Form.Select
            size="sm"
            onChange={(event) => setProjectsFilter(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Mine">Mine</option>
          </Form.Select>
        </Col>
      </Row>
      <p></p>
      <Accordion alwaysOpen>
        {projects
          .sort((p1, p2) => (p1.name < p2.name ? -1 : 1))
          .filter(filterProject)
          .map((p) => (
            <Accordion.Item eventKey={p.id} key={p.id}>
              <Accordion.Header>
                <ProjectMiniView
                  nameLimitSize={30}
                  viewLabel={false}
                  project={p}
                  userProfile={userProfile}
                />
              </Accordion.Header>
              <Accordion.Body>
                <ProjectView
                  viewLabel={false}
                  viewTitle={false}
                  viewDelete={
                    p.owner.id === userProfile.id || userProfile.is_superuser
                  }
                  project={p}
                  userProfile={userProfile}
                  onDelete={onDelete}
                  descLimitSize={300}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </>
  );
};

export default ProjectList;
