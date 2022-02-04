import { forwardRef, useImperativeHandle, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import ReactDom from "react-dom";

const ShowMessageContent = ({ error, message, onClose, id, delay = 5000 }) => {
  const [show, setShow] = useState(true);

  return (
    <Toast
      onClose={() => {
        setShow(false);
        onClose(id);
      }}
      show={show}
      bg={error === true ? "danger" : "success"}
      delay={delay}
      autohide={true}
    >
      <Toast.Header>
        <strong className="me-auto">
          {error === true ? "Error" : "Message"}
        </strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

const ShowMessage = forwardRef(({ delay = 5000 }, ref) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  useImperativeHandle(ref, () => ({
    addMessage(toast) {
      setToasts([...toasts, { ...toast, id: crypto.randomUUID() }]);
    },
  }));

  return (
    <>
      {ReactDom.createPortal(
        <ToastContainer
          // always visible
          style={{
            zIndex: 1000,
          }}
          position="bottom-center"
        >
          {toasts.map((t) => (
            <ShowMessageContent
              id={t.useImperativeHandle}
              key={t.id}
              error={t.error}
              message={t.message}
              onClose={(id) => removeToast(id)}
              delay={delay}
            />
          ))}
        </ToastContainer>,
        // place ToastContainer at top screen id=root
        document.getElementById("root")
      )}
    </>
  );
});

export default ShowMessage;
