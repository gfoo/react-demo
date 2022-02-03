import { Spinner } from "react-bootstrap";

const SmallSpinner = () => {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  );
};

export default SmallSpinner;
