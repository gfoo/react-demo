import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({ message, show = false, onConfirm = () => {} }) => {
  return (
    <Modal show={show} onHide={() => onConfirm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation dialog</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onConfirm(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onConfirm(true)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
