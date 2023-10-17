import { useState } from "react";
import styles from "./styles/LogReg.module.scss";
import RegModal from "./RegModal";
import LogModal from "./LoginModal";

const LogReg = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenLoginModal}>Login</button>
      <button onClick={handleOpenRegisterModal}>Register</button>
      <RegModal isOpen={isRegisterModalOpen} handleClose={handleCloseModal} />
      <LogModal isOpen={isLoginModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};

export default LogReg;
