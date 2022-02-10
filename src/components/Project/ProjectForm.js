import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SmallSpinner from "../Layout/SmallSpinner";

const ProjectForm = ({
  project = {},
  outlinedLabel = true,
  submitLabel,
  cancelLabel = "Cancel",
  viewCancel = "true",
  disabled = false,
  pending = false,
  validated = false,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const [projectInput, setProjectInput] = useState(project);
  useEffect(() => {
    setProjectInput(project);
  }, [project]);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={(event) => {
        onSubmit(event, projectInput);
      }}
    >
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter name"
          value={projectInput.name}
          onChange={(event) =>
            setProjectInput((prevProjectInput) => ({
              ...prevProjectInput,
              name: event.target.value,
            }))
          }
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={4}
          placeholder="Enter a description"
          value={projectInput.description}
          onChange={(event) => {
            setProjectInput((prevProjectInput) => ({
              ...prevProjectInput,
              description: event.target.value,
            }));
          }}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid description
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="switch"
          checked={projectInput.private}
          onChange={(event) => {
            setProjectInput((prevProjectInput) => ({
              ...prevProjectInput,
              private: event.target.checked,
            }));
          }}
          label="Private"
        />
      </Form.Group>
      <Button
        variant={`${outlinedLabel ? "outline-" : ""}primary`}
        disabled={disabled}
        type="submit"
      >
        {pending && <SmallSpinner />}
        {submitLabel}
      </Button>
      {viewCancel && (
        <>
          &nbsp;
          <Button
            onClick={onCancel}
            variant={`${outlinedLabel ? "outline-" : ""}secondary`}
            disabled={disabled}
            type="button"
          >
            {pending && <SmallSpinner />}
            {cancelLabel}
          </Button>
        </>
      )}
    </Form>
  );
};

export default ProjectForm;
