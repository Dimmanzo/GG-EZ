import React from "react";
import { Toast } from "react-bootstrap";
import toastStyles from "../styles/components/Toast.module.css";

// CustomToast Component: Displays a success message when a user logs in
const CustomToast = ({ show, onClose, message, username }) => {
  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={1000}
      autohide
      className={toastStyles.toast}
    >
      {/* Toast body content */}
      <Toast.Body className={toastStyles.toastBody}>
        You successfully logged in as{" "}
        <span style={{ color: "#00ff99", fontWeight: "bold" }}>{username}</span>!
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
