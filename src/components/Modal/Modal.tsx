import React, { useState } from 'react'
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.68);
  background-size: 100% 100%;
`;

const Body = styled.div`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%,-50%);
  background-color: #fff;
  padding: 24px;
  min-height: 70px;
  width: 400px;
  box-shadow: 0px 0px 2px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 2;
  max-width: 90%;
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 32px;
`;

const Modal = ({ onClose, children }: ModalProps) => {
  const [visible, setVisile] = useState(true)
  
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