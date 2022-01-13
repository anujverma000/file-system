import React, { useState } from 'react';
import styled from 'styled-components';
import { DeleteConfirmation, NameEditor } from '..';
import deleteIcon from '../../icons/delete.svg';
import icon from '../../icons/file.svg';
import { FileType } from '../../rootFiles';

export interface FileProps {
  file: FileType
  deleteFile: (file: FileType) => void
  updateFileName: (file: FileType, newName: string) => void
  setFileNameEditMode: (file: FileType) => void
}

const DeleteIcon = styled.img`
  display: none;
  position: absolute;
  top: -8px;
  right: -30px;
`;

const FileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s;
  margin: 12px;
  position: relative;
  &:hover{
    background: #fef5f7;
    ${DeleteIcon} {
        display: flex;
      }
  }
`;

const Name = styled.div`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  height: 21px;
`;


const File = ({file, deleteFile, updateFileName, setFileNameEditMode} : FileProps) => {
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false)
  const toggleDeleteConfirmation = () => setDeleteConfirmationVisible(!deleteConfirmationVisible)

  return (
    <FileContainer>
      <DeleteIcon src={deleteIcon} alt="delete" onClick={toggleDeleteConfirmation}/>
      {deleteConfirmationVisible && <DeleteConfirmation file={file} deleteFile={deleteFile} onClose={toggleDeleteConfirmation} />}
      <img src={icon} alt="file" />
      {file.isEditingName ? <NameEditor file={file} updateName={updateFileName}/> : <Name onClick={() => setFileNameEditMode(file)}>{file.name}</Name>}
    </FileContainer>
  )
}

export default File
