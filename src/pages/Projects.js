import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import SmallSpinner from "../components/Layout/SmallSpinner";
import ProjectForm from "../components/Project/ProjectForm";
import ProjectList from "../components/Project/ProjectList";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../hooks/use-http";
import { createProject, getProjects } from "../lib/api";
import AuthContext from "../store/auth-context";
import MessageContext from "../store/message-context";

const emptyProject = {
  name: "",
  description: "",
  private: true,
};

const Projects = () => {
  const { showMessageRef } = useContext(MessageContext);
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [createProjectInput, setCreateProjectInput] = useState(emptyProject);
  const [validateCreateInput, setValidateCreateInput] = useState(false);

  const {
    sendRequest: getProjectsSendRequest,
    status: getProjectsStatus,
    data: getProjectsResponse,
    error: getProjectsError,
  } = useHttp(getProjects);

  const {
    sendRequest: createProjectRequest,
    status: createProjectStatus,
    error: createProjectError,
  } = useHttp(createProject);

  useEffect(() => {
    getProjectsSendRequest({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getProjectsStatus === HTTP_STATUS_COMPLETE) {
      if (!getProjectsError) {
        setProjects(getProjectsResponse);
      } else {
        showMessageRef.current.addMessage({
          error: true,
          message: getProjectsError,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProjectsStatus]);

  const onDeleteUserHandler = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((p) => p.id !== projectId)
    );
  };

  const onSubmitCreateHandler = async (event, project) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === true) {
      createProjectRequest({
        token,
        name: project.name,
        description: project.description,
        private_: project.private,
      });
      setValidateCreateInput(false);
    } else {
      setValidateCreateInput(true);
    }
  };

  // call  only if project added
  useEffect(() => {
    if (createProjectStatus === HTTP_STATUS_COMPLETE) {
      if (!createProjectError) {
        // clone to allow react to detect props changed
        setCreateProjectInput({ ...emptyProject });
        getProjectsSendRequest({ token });
      }
      showMessageRef.current.addMessage({
        error: !!createProjectError,
        message: createProjectError
          ? createProjectError
          : "Project successfully created!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createProjectStatus]); // deps of createProjectStatus only because parent will re-render this child

  return (
    <Container>
      <Row md={2}>
        <Col sm={1}>
          <Card>
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              {getProjectsStatus === HTTP_STATUS_PENDING && <SmallSpinner />}
              {projects.length === 0 && <p>No projects</p>}
              {projects.length > 0 && (
                <ProjectList
                  projects={projects}
                  onDelete={onDeleteUserHandler}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={1}>
          <Card>
            <Card.Body>
              <ProjectForm
                submitLabel="Create project"
                viewCancel={false}
                project={createProjectInput}
                onSubmit={onSubmitCreateHandler}
                validated={validateCreateInput}
                disabled={createProjectStatus === HTTP_STATUS_PENDING}
                pending={createProjectStatus === HTTP_STATUS_PENDING}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;
