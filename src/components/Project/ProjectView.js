import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useHttp, { HTTP_STATUS_COMPLETE } from "../../hooks/use-http";
import { deleteProject } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import MessageContext from "../../store/message-context";
import ConfirmModal from "../Layout/ConfirmModal";
import LimitedParagraph from "../Layout/LimitedParagraph";
import ProjectMiniView from "./ProjectMiniView";

const ProjectView = ({
  project,
  userProfile,
  viewEdit = true,
  viewDelete = true,
  viewTitle = true,
  viewLabel = true,
  descLimitSize = null,
  onDelete = () => {},
}) => {
  const { showMessageRef } = useContext(MessageContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { token } = useContext(AuthContext);

  const {
    sendRequest: deleteProjectRequest,
    status: deleteProjectStatus,
    error: deleteProjectError,
    data: deleteProjectData,
  } = useHttp(deleteProject);

  const onDeleteHandler = () => {
    setShowConfirmDelete(true);
  };

  const onConfirmDeleteHandler = (delete_) => {
    setShowConfirmDelete(false);
    if (delete_) {
      deleteProjectRequest({
        projectId: project.id,
        token,
      });
    }
  };

  useEffect(() => {
    if (deleteProjectStatus === HTTP_STATUS_COMPLETE) {
      if (!deleteProjectError) {
        onDelete(deleteProjectData.project_id);
      }
      showMessageRef.current.addMessage({
        error: !!deleteProjectError,
        message: deleteProjectError
          ? deleteProjectError
          : "Project successfully deleted!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteProjectStatus]);

  return (
    <>
      <Card>
        <Card.Body>
          {viewTitle && (
            <Card.Title>
              <ProjectMiniView
                showTooltip={false}
                project={project}
                userProfile={userProfile}
              />
            </Card.Title>
          )}
          <LimitedParagraph
            paragraph={project.description}
            limitSize={descLimitSize}
            prefix={viewLabel && "Description:"}
            prefixLinefeed={true}
            showTooltip={false}
          />
          {viewEdit && (
            <LinkContainer to={`/projects/${project.id}`}>
              <Button size="sm" variant="outline-primary">
                View
              </Button>
            </LinkContainer>
          )}
          &nbsp;
          {project.owner.id === userProfile.id && (
            <>
              <LinkContainer to={`/projects/${project.id}/?edit`}>
                <Button size="sm" variant="outline-primary">
                  Edit
                </Button>
              </LinkContainer>
              &nbsp;
            </>
          )}
          {viewDelete && (
            <Button
              onClick={onDeleteHandler}
              variant="outline-danger"
              size="sm"
            >
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>

      <ConfirmModal
        message="Do you really want to delete this project?"
        show={showConfirmDelete}
        onConfirm={(confirm) => onConfirmDeleteHandler(confirm)}
      />
    </>
  );
};

export default ProjectView;
