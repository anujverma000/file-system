import React, { useState } from 'react';
import styled from 'styled-components';
import { FileType } from '../../rootFiles';
import deleteIcon from '../../icons/delete.svg';
import icon from '../../icons/folder.svg';
import { DeleteConfirmation, NameEditor } from '..';

export interface FolderProps {
  file: FileType
  openFolder: (file: FileType) => void
  deleteFile: (file: FileType) => void
  updateFileName: (file: FileType, newName: string, editConfirm: boolean) => boolean
  setFileNameEditMode: (file: FileType) => void
}

const DeleteIcon = styled.img`
  display: none;
  position: absolute;
  top: -8px;
  right: -30px;
`;

const FolderContainer = styled.div`
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

const Folder = ({file, openFolder, deleteFile, updateFileName, setFileNameEditMode} : FolderProps) => {
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false)
  const toggleDeleteConfirmation = () => setDeleteConfirmationVisible(!deleteConfirmationVisible)

  return (
    <>
      <FolderContainer>
        <DeleteIcon src={deleteIcon} alt="delete" onClick={toggleDeleteConfirmation}/>
        {deleteConfirmationVisible && <DeleteConfirmation file={file} deleteFile={deleteFile} onClose={toggleDeleteConfirmation} />}
        <img src={icon} alt="folder" onClick={() => openFolder(file)}/>
        <NameEditor file={file} updateName={updateFileName} setEditMode={setFileNameEditMode}/>
      </FolderContainer>
    </>
  )
}

export default Folder
