import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SmallSpinner from "../components/Layout/SmallSpinner";
import ProjectForm from "../components/Project/ProjectForm";
import ProjectView from "../components/Project/ProjectView";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../hooks/use-http";
import { getProject, updateProject } from "../lib/api";
import AuthContext from "../store/auth-context";

const Project = () => {
  const { token, userProfile, showMessageRef } = useContext(AuthContext);
  const [validateUpdateInput, setValidateUpdateInput] = useState(false);
  let params = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  const {
    sendRequest: getProjectRequest,
    status: getProjectStatus,
    data: getProjectResponse,
    error: getProjectError,
  } = useHttp(getProject);

  const {
    sendRequest: updateProjectRequest,
    status: updateProjectStatus,
    error: updateProjectError,
    data: updateProjectResponse,
  } = useHttp(updateProject);

  const onUpdateProjectHandler = async (event, project) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === true) {
      updateProjectRequest({
        token,
        projectId: project.id,
        name: project.name,
        description: project.description,
        private_: project.private,
      });
      setValidateUpdateInput(false);
    } else {
      setValidateUpdateInput(true);
    }
  };

  useEffect(() => {
    getProjectRequest({ token, projectId: params.project_id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateProjectStatus === HTTP_STATUS_COMPLETE) {
      if (!updateProjectError) {
        setProject(updateProjectResponse);
        redirectToView();
      } else {
        showMessageRef.current.addMessage({
          error: true,
          message: updateProjectError,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProjectStatus]);

  useEffect(() => {
    if (getProjectStatus === HTTP_STATUS_COMPLETE) {
      if (!getProjectError) {
        setProject(getProjectResponse);
      } else {
        showMessageRef.current.addMessage({
          error: true,
          message: getProjectError,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProjectStatus]);

  const redirectToView = () => {
    navigate(`/projects/${project.id}`);
  };

  const onDeleteHandler = () => {
    navigate("/projects");
  };

  return (
    <Container>
      {!project && <SmallSpinner />}
      {project && searchParams.has("edit") && (
        <ProjectForm
          project={project}
          submitLabel="Save"
          onSubmit={onUpdateProjectHandler}
          onCancel={redirectToView}
          validated={validateUpdateInput}
          disabled={updateProjectStatus === HTTP_STATUS_PENDING}
          pending={updateProjectStatus === HTTP_STATUS_PENDING}
        />
      )}
      {project && !searchParams.has("edit") && (
        <ProjectView
          viewEdit={false}
          viewDelete={
            project.owner.id === userProfile.id || userProfile.is_superuser
          }
          project={project}
          userProfile={userProfile}
          onDelete={onDeleteHandler}
        />
      )}
    </Container>
  );
};

export default Project;
