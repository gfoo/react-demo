import { Fragment, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import ReactDom from "react-dom";

const ShowMessageContent = ({ error, message }) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer className="p-3" position="bottom-center">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        bg={error === true ? "danger" : "success"}
        delay={5000}
        autohide={true}
      >
        <Toast.Header>
          <strong className="me-auto">
            {error === true ? "Error" : "Message"}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

const ShowMessage = ({ error, message }) => {
  // place ToastContainer at top screen
  return (
    <Fragment>
      {ReactDom.createPortal(
        <ShowMessageContent error={error} message={message} />,
        document.getElementById("root")
      )}
    </Fragment>
  );
};

export default ShowMessage;
