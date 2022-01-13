import React from 'react';
import styled from 'styled-components';
import { Modal } from '..';
import deleteIcon from '../../icons/delete.svg';
import { FileType } from '../../rootFiles';

interface DeleteProps {
  file: FileType
  deleteFile: (file: FileType) => void
  onClose: () => void
}

type ButtonProps = {
  primary?: boolean
}

export const DeleteIcon = styled.img`
  display: none;
  position: absolute;
  top: -8px;
  right: -30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Message = styled.p`
  margin: 12px 0;
  color: #626263;
  font-size: 14px;
`; 

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: ${(props: ButtonProps) => props.primary ? '#3498da' : '#ddd'};
  color: ${(props: ButtonProps) => props.primary ? '#fff' : '#626263'};
  border: 1px solid #fef5f7;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 4px;
  cursor: pointer;
`;

const DeleteConfirmation = ({ file, deleteFile, onClose }: DeleteProps) => {
  const deleteFileHandler = () => {
    deleteFile(file);
    onClose()
  }
  return (
    <Modal onClose={onClose}>
      <Header>
        <strong>Delete {`${file.isFolder? 'Folder': 'File'}?`}</strong>
        <img src={deleteIcon} alt="delete" onClick={onClose}/>
      </Header>
      <Message>
        {`Are you sure you want to delete ${file.name}?`}
      </Message>
      <ActionBar>
        <Button onClick={onClose}>Cancel</Button>
        <Button primary onClick={deleteFileHandler}>Delete</Button>
      </ActionBar>
    </Modal>
  )
}

export default DeleteConfirmation;

