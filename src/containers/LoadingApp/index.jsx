import React from "react";
import { Modal } from "react-bootstrap";
import Lottie from "react-lottie-player";
import loading from "../../assets/lottie/loading.json";

export default function LoadingApp({ isLoading = false }) {
  return (
    <Modal
      show={isLoading}
      centered
      keyboard={false}
      backdrop={"static"}
      style={{ borderRadius: "10px" }}
    >
      <Lottie loop animationData={loading} play />
    </Modal>
  );
}
