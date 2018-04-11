import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.hide}>
        <Modal.Header>
          <Modal.Title> Login </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {// login
                    }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hide}> Close </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LoginModal;
