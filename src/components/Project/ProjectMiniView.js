import { Badge } from "react-bootstrap";
import LimitedParagraph from "../Layout/LimitedParagraph";

const ProjectMiniView = ({
  project,
  userProfile,
  viewLabel = true,
  nameLimitSize = null,
  showTooltip = true,
}) => {
  return (
    <>
      <LimitedParagraph
        paragraph={project.name}
        limitSize={nameLimitSize}
        prefix={viewLabel ? "Name: " : ""}
        showTooltip={showTooltip}
      />
      &nbsp;
      <h6>
        <Badge bg={project.private ? "danger" : "success"}>
          {project.private ? "private" : "public"}
        </Badge>
        &nbsp;
        {project.owner.id !== userProfile.id && (
          <Badge bg="warning">{project.owner.fullname}</Badge>
        )}
      </h6>
    </>
  );
};

export default ProjectMiniView;
