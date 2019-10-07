import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
function Modals() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Invite Friend
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Search For User <input type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Invite This User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
