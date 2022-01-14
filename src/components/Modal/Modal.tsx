import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components';

const ENTER_KEY_NAME = 'Enter';
const ESC_KEY_NAME = 'Escape';

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
  onSuccess: () => void
}

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.68);
  background-size: 100% 100%;
  z-index: 1;
`;

const Body = styled.div`
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%,-50%);
  background-color: #fff;
  padding: 24px;
  min-height: 70px;
  width: 400px;
  box-shadow: 0px 0px 14px 0px #00000080;
  border-radius: 10px;
  z-index: 2;
  white-space: pre-wrap;
  font-size: 16px;
  z-index: 2;
`;

const Modal = ({ children, onClose, onSuccess }: ModalProps) => {
  const [visible, setVisile] = useState(true)
  
  const handleKeyPress = useCallback((event) => {
    if(event.key === ENTER_KEY_NAME) {
      onSuccess();
    }
    if(event.key === ESC_KEY_NAME) {
      setVisile(false);
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);
    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!visible) return null

  return (
    <>
      <Backdrop onClick={() => {
        setVisile(false);
        onClose();
      }} />
      <Body>
        {children}
      </Body>
    </>
  )
}

export default Modal