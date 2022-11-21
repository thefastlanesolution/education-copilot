import React, { Component } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import '../AI-tools-css/ModalStyling.css';

export class videoModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }
  render() {
    return (
      <div>
        <div>
          <ModalVideo
            className="modal"
            channel="youtube"
            isOpen={this.state.isOpen}
            videoId="O6AxxYhCxeQ"
            onClose={() => this.setState({ isOpen: false })}
          />
          <button className="modalbtn" onClick={this.openModal}>
            Video Tutorial
          </button>
        </div>
      </div>
    );
  }
}

export default videoModal;
