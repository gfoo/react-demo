import { Fragment, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import ReactDom from "react-dom";

const ShowMessageContent = (props) => {
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

const ShowMessage = (props) => {
  // place ToastContainer at top screen
  return (
    <Fragment>
      {ReactDom.createPortal(
        <ShowMessageContent error={props.error} message={props.message} />,
        document.getElementById("root")
      )}
    </Fragment>
  );
};

export default ShowMessage;
