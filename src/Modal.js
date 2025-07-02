import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => (
<div className="modal-overlay">
    <div className="modal-content">
    {children}
    <button className="modal-close-btn" onClick={onClose}>Close</button>
    </div>
</div>
);

export default Modal;
