import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ShowMessage = (props) => {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer className="p-3" position="bottom-center">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        bg={props.error === true ? "danger" : "success"}
        delay={5000}
        autohide={true}
      >
        <Toast.Header>
          <strong className="me-auto">
            {props.error === true ? "Error" : "Message"}
          </strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ShowMessage;
